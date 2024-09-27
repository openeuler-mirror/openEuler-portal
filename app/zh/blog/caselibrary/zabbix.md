---
title: '【案例】22.03 LTS 安装zabbix 教程'
date: '2024-07-30'
category: blog
tags:
  - 案例库
  - zabbix 
  - 教程
author: '富焘'
summary: '案例分析：22.03 LTS 安装zabbix'
---
# 22.03 LTS 安装zabbix 教程

## openEuler 最小安装

   关闭防火墙

   ```text
   systemctl stop firewalld
   systemctl disable firewalld
   ```

## MYSQL服务安装配置

1. 安装mysql

   ```text
   dnf install mysql mysql-server mysql-common mysql-libs mysql-devel mysql-selinux --nogpgcheck
   ```

2. 启动mysql服务

   ```text
   systemctl enable mysqld
   systemctl start mysqld
   systemctl status mysqld
   ```

3. 配置密码

   ```mysql
   mysql -uroot -p
   > password 回车
   ALTER USER 'root'@'localhost' IDENTIFIED BY '密码';
   ```

## 安装ZABBIX服务

   ```text
   dnf config-manager --add-repo https://repo.oepkgs.net/openeuler/rpm/openEuler-22.03-LTS/contrib/others/aarch64/
   dnf clean all && dnf makecache
   dnf install zabbix-server-mysql zabbix-web-mysql zabbix-nginx-conf zabbix-sql-scripts zabbix-agent --nogpgcheck
   ```

## 配置和启动zabbix进程

1. 配置zabbix

   ```mysql
   mysql -uroot -p
   > password
   create database zabbix character set utf8mb4 collate utf8mb4_bin;
   create user zabbix@localhost identified by '密码';
   grant all privileges on zabbix.* to zabbix@localhost;
   set global log_bin_trust_function_creators = 1;
   quit;
   ```

2. 初始化架构和数据

   ```text
   zcat /usr/share/doc/zabbix-sql-scripts/mysql/server.sql.gz | mysql --default-character-set=utf8mb4 -uzabbix -p zabbix
   ```
   
   Disable log_bin_trust_function_creators option after importing database schema.

   ```mysql
   mysql -uroot -p
   > password
   set global log_bin_trust_function_creators = 0;
   quit;
   ```

3. 修改zabbix server配置数据库和PHP

   ```text
   vi  /etc/zabbix/zabbix_server.conf 
   ---
   DBPassword=密码
   ---
   vi /etc/nginx/conf.d/zabbix.conf
   ---
   listen 8080;#取消注释
   server_name example.com;#取消注释
   ---
   ```

4. 升级net-snmp

   ```text
   dnf install net-snmp  net-snmp-devel net-snmp-utils --nogpgcheck
   ```

5. 启动zabbix进程

   ```text
   systemctl restart zabbix-server zabbix-agent nginx php-fpm
   systemctl enable zabbix-server zabbix-agent nginx php-fpm
   ```

6. 访问zabbix首页

   默认端口是8080
