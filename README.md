# bilibili评论转图片神器

供Bilibili UP主与观众互动，将Bilibili视频评论区的评论转换成PNG图片，应用场景如：呈现观众评论、评论互动、频道Q&A，将会陆续完善其他功能，敬请期待。

目前功能特色：
- 无评论获取数量上限
- 自由修改评论外观
- ZIP压缩包打包下载
- 评论内容为文件名

## Demo

http://tool.mightyherox.me

## Technology Stack
- Vue
- Node
- Bootstrap
- html2canvas
- JSZip

## Installation & Usage
1. Clone or Download the repository (Depending on whether you are using HTTPS or SSH)

```
git clone https://github.com/circle-hotaru/bilibili-comment2canvas.git
cd bilibili-comment2canvas
```

2. Install dependencies
```
npm i
```

3. Start the application
```
npm run serve
```

After the application starts visit http://localhost:8080 to view it in the browser.