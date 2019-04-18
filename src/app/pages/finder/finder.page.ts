import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { IonSlides, Platform } from '@ionic/angular';

@Component({
  selector: 'app-finder',
  templateUrl: './finder.page.html',
  styleUrls: ['./finder.page.scss'],
})

export class FinderPage implements OnInit {

  // segment 初始状态
  segmentValue = 'recommend';
  segmentMap = ['focus', 'recommend', 'video'];
  done = false;

  // slides 指示器样式
  indicatorStyles: any;

  // 最高列
  maxCol = 0;

  // 视频数据
  videos = [
    {cover: '/assets/images/video_1.jpg', width: 404, height: 667},
    {cover: '/assets/images/video_2.jpg', width: 915, height: 1403},
    {cover: '/assets/images/video_3.jpg', width: 720, height: 1280},
    {cover: '/assets/images/video_4.jpg', width: 375, height: 536}
  ];

  // 处理后的数据
  videoItems: any[] = [];

  // 配置swiper
  slideOpts = {
    initialSlide: this.segmentMap.indexOf(this.segmentValue),
    scrollbar: {
      el: '.indicator',
      hide: false,
      dragSize: 24,
    },
    resistanceRatio: 0
  };

  // 获取 swiper 实例
  @ViewChild(IonSlides) slides: IonSlides;

  constructor(
    private el: ElementRef,
    private platform: Platform
  ) {
    // 代码...
  }

  ngOnInit() {
    // 初始相关参数
    let ratio = 1;
    let h = [];
    let gap = 3;
    let column = 2;

    // 计算每个元素的宽度
    let width = (this.platform.width() - gap) / column;

    this.videos.forEach((val, key) => {
      let tmp = {};

      tmp['styles'] = {};

      // 封面图路径
      tmp['cover'] = val.cover;

      // 计算图片宽度比
      ratio = val.width / val.height;

      // 计算图片的缩放尺寸
      tmp['styles']['width'] = width + 'px';
      tmp['styles']['height'] = width / ratio + 'px';

      // 第一行元素
      if(key < column) {
        // 设定元素的定位坐标
        tmp['styles']['top'] = '0px';
        tmp['styles']['left'] = (width + gap) * key + 'px';

        // 计录每一列的高度
        h.push(parseFloat(tmp['styles']['height']));

        this.videoItems.push(tmp);

        return;
      }

      // 其它行元素，找出最小列高度
      let min = Math.min(...h);
      let index = h.indexOf(min);

      tmp['styles']['top'] = min + gap + 'px';
      tmp['styles']['left'] = (width + gap) * index + 'px';

      h[index] += min + gap;

      this.videoItems.push(tmp);
    });

    // 计算最大列
    this.maxCol = Math.max(...h);

  }

  // 监听 segment 状态变化
  segmentSelected(ev) {
    this.segmentValue = ev.target.getAttribute('value');

    // 计算 segment 的宽度及位置
    if(!this.done) {
      
      this.done = true;

      let segmentDOM = this.el.nativeElement.querySelector('ion-segment-button');

      let segmentWidth = segmentDOM.clientWidth;
      let segmentOffset = segmentDOM.offsetLeft;
      let labelWidth = segmentDOM.firstChild.clientWidth;
      let labelOffset = segmentDOM.firstChild.offsetLeft;
      
      console.log(segmentOffset, labelOffset)

      this.indicatorStyles = {
        width: segmentWidth * 3 - 6 - segmentWidth + labelWidth + 'px',
        left: segmentOffset + labelOffset + 3 + 'px'
      }
    }

    // 切换 swiper
    this.slides.slideTo(this.segmentMap.indexOf(this.segmentValue));
  }

  // 监听 swiper 切换
  slideDidChange() {
    this.slides.getActiveIndex().then((index) => {
      this.segmentValue = this.segmentMap[index]
    });
  }

  // 下拉刷新
  doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  doScroll(event) {
    // 
  }
}



