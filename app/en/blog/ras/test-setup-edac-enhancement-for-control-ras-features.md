---
title: 'Test setup for EDAC RAS features control'

category: blog

date: 2024-09-23

tags:
  - openEuler
  - EDAC
  - RAS
  - CXL

author:
  - Shiju Jose

summary: QEMU arm64 test setup for EDAC RAS features control.
---

# Introduction

Describes test setups for EDAC RAS features control.

# QEMU test setup for CXL

## Build QEMU for testing CXL

git clone https://gitlab.com/jic23/qemu.git

cd qemu

git checkout cxl-2024-08-20

Apply following fix patch for CXL ECS,
https://lore.kernel.org/qemu-devel/20240927091743.965-1-shiju.jose@huawei.com/T/#u

mkdir qemu/build

cd qemu/build

../configure --target-list=aarch64-softmmu --enable-slirp

make

Note1: For testing CXL PPR feature, following patches are required.

https://lore.kernel.org/all/20240730045722.71482-1-dave@stgolabs.net/

## Download an arm64 filesystem

An arm64 filesystem image is needed. For instance, you can download arm64 qcow2 image from http://cdimage.debian.org/cdimage/cloud/sid/daily/.

For example, debian-sid-nocloud-arm64-daily-20240923-1879.qcow2 and

Rename to say, debian.qcow2 and copy to qemu/build

##  Generate an arm64 UEFI bios for QEMU

Please see section EDK2 in https://people.kernel.org/jic23/howto-test-cxl-enablement-on-arm64-using-qemu for some instructions.

Copy QEMUEFI.fd to qemu/build 

## Build kernel image for arm64
1. Cross compiler
Often available as part of a Linux distribution.
Assume it is already setup.

2. Build kernel

Latest kernel patches ( for V13) for EDAC enhancement for RAS features. 

https://github.com/shijujose4/linux.git

Branch: edac-enhancement-ras-features_v13

--- a/arch/arm64/configs/defconfig

+++ b/arch/arm64/configs/defconfig

@@ -1713,3 +1713,10 @@ CONFIG_CORESIGHT_STM=m

 CONFIG_CORESIGHT_CPU_DEBUG=m

 CONFIG_CORESIGHT_CTI=m

 CONFIG_MEMTEST=y

+CONFIG_CXL_BUS=y

+CONFIG_CXL_PCI=y

+CONFIG_CXL_MEM=y

+CONFIG_CXL_RAS_FEAT=y

For eg.

export ARCH=arm64

export CROSS_COMPILE=aarch64-linux-gnu-

make mrproper

make defconfig ARCH=arm64

make -j 32 ARCH=arm64

Copy arch/arm64/boot/Image to qemu/build

## Booting the kernel image with QEMU for testing CXL

./qemu-system-aarch64 -M virt,nvdimm=on,gic-version=3,cxl=on -m 4g,maxmem=8G,slots=8 -cpu max -smp 4 -kernel Image -drive if=none,file=debian.qcow2,format=qcow2,id=hd -device pcie-root-port,id=root_port1 -device virtio-blk-pci,drive=hd -netdev type=user,id=mynet,hostfwd=tcp::5555-:22 -qmp tcp:localhost:4445,server=on,wait=off -device virtio-net-pci,netdev=mynet,id=bob -nographic -no-reboot -append 'earlycon root=/dev/vda1 fsck.mode=skip tp_printk maxcpus=4' -monitor telnet:127.0.0.1:1234,server,nowait -bios QEMU_EFI.fd -object memory-backend-ram,size=4G,id=mem0 -numa node,nodeid=0,cpus=0-3,memdev=mem0 -object memory-backend-file,id=cxl-mem1,share=on,mem-path=/tmp/cxltest.raw,size=256M,align=256M -object memory-backend-file,id=cxl-mem2,share=on,mem-path=/tmp/cxltest2.raw,size=256M,align=256M -object memory-backend-file,id=cxl-mem3,share=on,mem-path=/tmp/cxltest3.raw,size=256M,align=256M -object memory-backend-file,id=cxl-mem4,share=on,mem-path=/tmp/cxltest4.raw,size=256M,align=256M -object memory-backend-file,id=cxl-lsa1,share=on,mem-path=/tmp/lsa.raw,size=1M,align=1M -object memory-backend-file,id=cxl-lsa2,share=on,mem-path=/tmp/lsa2.raw,size=1M,align=1M -object memory-backend-file,id=cxl-lsa3,share=on,mem-path=/tmp/lsa3.raw,size=1M,align=1M -object memory-backend-file,id=cxl-lsa4,share=on,mem-path=/tmp/lsa4.raw,size=1M,align=1M -object memory-backend-file,id=cxl-mem5,share=on,mem-path=/tmp/cxltest5.raw,size=256M,align=256M -object memory-backend-file,id=cxl-mem6,share=on,mem-path=/tmp/cxltest6.raw,size=256M,align=256M -object memory-backend-file,id=cxl-mem7,share=on,mem-path=/tmp/cxltest7.raw,size=256M,align=256M -object memory-backend-file,id=cxl-mem8,share=on,mem-path=/tmp/cxltest8.raw,size=256M,align=256M -object memory-backend-file,id=cxl-lsa5,share=on,mem-path=/tmp/lsa5.raw,size=1M,align=1M -object memory-backend-file,id=cxl-lsa6,share=on,mem-path=/tmp/lsa6.raw,size=1M,align=1M -object memory-backend-file,id=cxl-lsa7,share=on,mem-path=/tmp/lsa7.raw,size=1M,align=1M -object memory-backend-file,id=cxl-lsa8,share=on,mem-path=/tmp/lsa8.raw,size=1M,align=1M -device pxb-cxl,bus_nr=12,bus=pcie.0,id=cxl.1 -device cxl-rp,port=0,bus=cxl.1,id=root_port0,chassis=0,slot=2 -device cxl-rp,port=1,bus=cxl.1,id=root_port2,chassis=0,slot=3   -device virtio-rng-pci,bus=root_port2 -device cxl-upstream,port=33,bus=root_port0,id=us0,multifunction=on,addr=0.0 -device cxl-downstream,port=0,bus=us0,id=swport0,chassis=0,slot=4 -device cxl-downstream,port=1,bus=us0,id=swport1,chassis=0,slot=5 -device cxl-downstream,port=2,bus=us0,id=swport2,chassis=0,slot=6 -device cxl-downstream,port=3,bus=us0,id=swport3,chassis=0,slot=7 -device cxl-type3,bus=swport0,memdev=cxl-mem1,id=cxl-pmem0,lsa=cxl-lsa1,sn=3 -device cxl-type3,bus=swport1,memdev=cxl-mem2,id=cxl-pmem1,lsa=cxl-lsa2,sn=4 -device cxl-type3,bus=swport2,memdev=cxl-mem3,id=cxl-pmem2,lsa=cxl-lsa3,sn=5 -device cxl-type3,bus=swport3,memdev=cxl-mem4,id=cxl-pmem3,lsa=cxl-lsa4,sn=6 -machine cxl-fmw.0.targets.0=cxl.1,cxl-fmw.0.size=4G,cxl-fmw.0.interleave-granularity=1k -machine  ras=on

password

localhost login: root

root@localhost:~# ls -l /sys/bus/edac/devices/

lrwxrwxrwx 1 root root 0 Sep 23 09:42 cxl_mem0 -> ../../../devices/pci0000:0c/0000:0c:00.0/0000:0d:00.0/0000:0e:00.0/0000:0f:00.0/mem0/cxl_mem0

lrwxrwxrwx 1 root root 0 Sep 23 09:42 cxl_mem1 -> ../../../devices/pci0000:0c/0000:0c:00.0/0000:0d:00.0/0000:0e:01.0/0000:10:00.0/mem1/cxl_mem1

lrwxrwxrwx 1 root root 0 Sep 23 09:42 cxl_mem2 -> ../../../devices/pci0000:0c/0000:0c:00.0/0000:0d:00.0/0000:0e:02.0/0000:11:00.0/mem2/cxl_mem2

lrwxrwxrwx 1 root root 0 Sep 23 09:42 cxl_mem3 -> ../../../devices/pci0000:0c/0000:0c:00.0/0000:0d:00.0/0000:0e:03.0/0000:12:00.0/mem3/cxl_mem3

lrwxrwxrwx 1 root root 0 Sep 23 09:42 mc -> ../../../devices/system/edac/mc

root@localhost:~# ls -l /sys/bus/edac/devices/cxl_mem0/scrub0/

-rw-r--r-- 1 root root 4096 Sep 23 21:28 current_cycle_duration

-rw-r--r-- 1 root root 4096 Sep 23 21:28 enable_background

-r--r--r-- 1 root root 4096 Sep 23 21:28 max_cycle_duration

-r--r--r-- 1 root root 4096 Sep 23 21:28 min_cycle_duration
