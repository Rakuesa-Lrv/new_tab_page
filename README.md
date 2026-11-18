# NewTabPage

> wxt + React 浏览器起始标签页扩展

> 状态: 开发中 无发行版

## 展示

![截图](docs/demo.png)

## 功能

- 切换搜索引擎
- 通过各搜索引擎进行搜索
- 添加/修改/删除快捷方式

## 技术栈
| 分类 | 技术 |
| --- | --- |
| 浏览器扩展 | wxt ^0.21.3 |
| 前端框架 | React 19 |
| 组件库 | Radix-UI |
| 语言 | TypeScript ^5.9 |
| 状态管理 | Zustand 5 |
| 不可变数据 | Immer + use-immer |
| 包管理 | pnpm 12.11.2 |

## 环境

- Node.js ^18
- pnpm ^12.11.2

## 项目启动

### 0. 安装 pnpm

如果本机没有 pnpm，可以通过 Corepack 启用：

```bash
corepack enable
corepack prepare pnpm@12.11.2 --activate
```

也可以直接安装：

```bash
npm install -g pnpm@12.11.2
```

### 1. 安装依赖

```bash
pnpm install
```

### 2. 启动 wxt 浏览器扩展开发模式

```bash
pnpm run dev
```

## 目录结构

```text
newTabPage/
├── docs/                         # 文档资源
├── public/                       # 静态资源
├── src/                          # React 前端源码
│   ├── assets/                   # 图片资源
│   ├── components/               # 组件
│   ├── entrypoints/
│   │   ├── newtab/               # 新建标签页
│   │   │    ├── App.tsx          # 最外部组件
│   │   │    ├── index.html
│   │   │    ├── main.tsx         # 前端入口
│   │   │    └── style.css        # 全局样式
│   │   ├── popup/
│   │   ├── background.ts
│   │   └── content.ts
│   ├── hooks/                    # 钩子函数
│   └── utils/                    # 通用函数
├── .gitignore
├── package.json
├── pnpm-lock.yaml
├── README.md
├── tsconfig.json
└── wxt.config.ts
```

## TODO

### 进行中

- [ ] 自定义背景

### 未完成

- [ ] 预设UI配色方案
- [ ] 用户配置页面
- [ ] icon获取优化
- [ ] 快捷方式拖拽排序

### 已完成

- [x] 搜索框搜索
- [x] 搜索引擎选择
- [x] 快捷方式增删改
- [x] 快捷方式自动名称和icon
- [x] 快捷方式卡片翻页菜单
- [x] 持久化方案

## 致谢

- wxt
- React
- Zustand
- Radix-UI
- 其他各库的贡献者
- 各技术文档编撰者
- 整个开源社区