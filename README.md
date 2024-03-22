# 中华诗词

中华诗词收录了上至先秦，下至当代共计六万余首诗词，完全免费并开放所有诗词内容和程序源代码，您可自由复制、修改、传播诗词内容和程序源码
数据来源[`michaelliao-shci`](https://github.com/michaelliao/shici/).

## 技术栈
1. 框架 sveltekit4
2. 数据库 sqlite（推荐SQLite客户端 [http://sqlitebrowser.org](http://sqlitebrowser.org)）
3. ORM 使用 prisma
4. 验证码 svg-captcha


## 功能
1. 诗词朝代
2. 诗词列表
3. 诗人列表
4. 诗词详情
5. 诗词收藏
6. 诗词纠错
7. 用户
   1. 登录
   2. 注册（第1个注册的账号默认为管理员）
   3. 密码找回（短信接口配置）
   4. 我的收藏
   5. 我的纠错
8. 用户管理
   1. 新增
   2. 编辑
   3. 启用、禁用
   4. 重置密码
9.  网站设置（管理员权限）
   1. 重置密码设置
   2. 管理员微信联系方式
   3. 短信接口配置
   4. 账号开放控制（登录和注册）

## 本地开发

```bash
# 安装依赖
npm i
```

```bash
npm run dev

# 在浏览器打开
npm run dev -- --open
```

## 构建

```bash
npm run build
```

## 预览
```bash
npm run preview
```
