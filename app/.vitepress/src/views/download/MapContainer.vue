<script setup lang="ts">
import { onMounted, ShallowRef, toRefs } from 'vue';
import AMapLoader from '@amap/amap-jsapi-loader';
import { shallowRef } from 'vue';
import { useData } from 'vitepress';
interface MapMsg {
  name: string;
  latitude: number;
  longitude: number;
  location: string;
  http: string;
}
const props = defineProps({
  mapData: {
    type: Array,
    default: () => [],
  },
});
const { lang } = useData();
const { mapData } = toRefs(props);
const map: ShallowRef<any> = shallowRef(null);
const initMap = (lng: number, lat: number) => {
  AMapLoader.load({
    key: 'c042a36d28964bd1e1e1785849fb335f', // 申请好的Web端开发者Key，首次调用 load 时必填
    version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
  })
    .then((AMap) => {
      map.value = new AMap.Map('container', {
        zoom: 4, //  初始化地图级别
        center: [lng, lat], //  初始化地图中心点位置
        lang: lang.value,
      });
      const point: any[] = [];

      (mapData.value as MapMsg[])?.forEach((item: MapMsg) => {
        point.push({
          location: item.location,
          title: item.name,
          http: item.http,
          lnglat: [item.longitude, item.latitude],
        });
      });

      const _renderClusterMarker = function (context: {
        clusterData: any[];
        count: string;
        marker: {
          setContent: any;
          setOffset: any;
        };
      }) {
        let cardList = '';
        context.clusterData[0]._amapMarker.originData[0].forEach(
          (item: { title: string; http: string }) => {
            cardList +=
              '<a class="map-card-name" href="' +
              item.http +
              '" target="_blank"  rel="noopener noreferrer">' +
              item.title +
              '</a></br>';
          }
        );

        const content =
          '<div class="map-content">' +
          '   <div class="map-icon"></div>' +
          '   <div class="map-word">' +
          context.count +
          'mirrors are selected here' +
          '</div>' +
          '   <div class="wrap">' +
          '   <div class="map-card">' +
          cardList +
          '<div class="map-card-location">' +
          context.clusterData[0].location +
          '</div>' +
          '</div>' +
          '</div>';
        const offset = new AMap.Pixel(-9, -9);
        context.marker.setContent(content);
        context.marker.setOffset(offset);
      };
      const _renderMarker = function (context: {
        data: { title: string; location: string; http: string }[];
        marker: {
          setContent: any;
          setOffset: any;
        };
      }) {
        const content =
          '<div class="map-content">' +
          '   <div class="map-icon"></div>' +
          '   <div class="map-word">' +
          context.data[0].title +
          '</div>' +
          '   <div class="wrap">' +
          '   <div class="map-card">' +
          '<a class="map-card-name" href="' +
          context.data[0].http +
          '" target="_blank"  rel="noopener noreferrer">' +
          context.data[0].title +
          '</a>' +
          '<div class="map-card-location">' +
          context.data[0].location +
          '</div>' +
          '</div>' +
          '</div>' +
          '</div>';
        const offset = new AMap.Pixel(-9, -9);
        context.marker.setContent(content);
        context.marker.setOffset(offset);
      };

      AMap.plugin(['AMap.MarkerCluster'], function () {
        new AMap.MarkerCluster(map.value, point, {
          gridSize: 10, // 设置网格像素大小
          renderClusterMarker: _renderClusterMarker, // 自定义聚合点样式
          renderMarker: _renderMarker, // 自定义非聚合点样式
        });
      });

      AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], function () {
        // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
        map.value.addControl(
          new AMap.ToolBar({
            locate: true,
            noIpLocate: true,
          })
        );
        // 在图面添加比例尺控件，展示地图在当前层级和纬度下的比例尺
        map.value.addControl(new AMap.Scale());
      });
    })
    .catch((e: any) => {
      throw new Error(e);
    });
};
onMounted(() => {
  setTimeout(function () {
    initMap(114.06063, 22.64407);
  }, 500);
});
</script>

<template>
  <div id="container"></div>
</template>

<style lang="scss">
#container {
  width: 100%;
  height: 100%;
}

.amap-marker:hover {
  z-index: 99 !important;
}

.map-content {
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
  z-index: 13;
  &:hover .wrap {
    transition: all 0.5s;
    display: block;
  }

  .wrap {
    top: 0;
    left: 0;
    padding: var(--e-spacing-h8);
    display: none;
    z-index: 13;
  }

  .map-card {
    left: 20px;
    transition: all 0.5s;
    padding: 20px;
    background-color: #fff;
    position: absolute;
    border: #fff285 1px solid;
    border-radius: var(--e-spacing-h10);
    box-shadow: var(--e-shadow-l1);
    z-index: 100;
    &-name {
      color: var(--e-color-brand1);
      font-size: var(--e-font-size-text);
      line-height: var(--e-line-height-text);
      white-space: nowrap;
    }
    &-location {
      color: var(--e-color-text4);
      font-size: var(--e-font-size-text);
      line-height: var(--e-line-height-text);
    }
  }
  .map-icon {
    width: var(--e-font-size-h8);
    height: var(--e-font-size-h8);
    border-radius: var(--e-font-size-h8);
    background-color: #fff285;
    margin-right: var(--e-spacing-h9);
    box-shadow: #f9762d 0px 0px 10px;
    transition: all 0.5s;
    cursor: pointer;

    &:hover {
      background-color: #ffff92;
      width: 17px;
      height: 17px;
      border-radius: 17px;
      transition: all 0.5s;
    }
  }
  .map-word {
    display: flex;
    flex-flow: row;
    flex-wrap: nowrap;
    font-size: var(--e-font-size-text);
    line-height: var(--e-line-height-text);
    white-space: nowrap;
    color: #000;
    font-weight: 600;
    -webkit-text-stroke: 0.5px #fff;
  }
}
</style>
