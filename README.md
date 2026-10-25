# site/ — 静态站骨架（内部草稿，未发布）

对应 stage2 清单项 3（静态站骨架）+ 项 4（产品页要素），2026-10-23 建成。
🔴 **未发布**：每页顶部有 draft 横幅；上线前必须清完 WAITING_FOR_HUMAN 六项并删横幅。

## 本地预览

```bash
cd site && python3 -m http.server 8080
# 打开 http://localhost:8080/
```

零构建零依赖（纯静态 HTML + 单 CSS，系统字体，无外部请求——与 scripts/build_pdf.py 同哲学）。
链接完整性检查：`python3 scripts/check_site_links.py`（2026-10-23 补 B/C 22 图与 3 个 draft PDF 链接后复跑通过，引用数以命令输出为准）。

## 页面清单（10 个）

| 页面 | 状态 | 上线前要做什么 |
|---|---|---|
| index.html | 内容完备 | 删 draft 横幅 |
| cat-moments.html | 内容完备（22 张真实预览图 + draft PDF 审阅链接） | checkout 按钮换支付平台链接（W1）；删「Internal review」PDF 行；删横幅 |
| cozy-home.html | 内容完备（22 张真实预览图 + draft PDF 审阅链接） | 同 cat-moments（W1 + 删 PDF 行 + 删横幅） |
| garden-mornings.html | 内容完备（22 张真实预览图 + draft PDF 审阅链接） | 同 cat-moments（W1 + 删 PDF 行 + 删横幅） |
| free-sample.html | 内容完备（真实 PDF 下载） | 删横幅 |
| license.html | 个人使用授权草案 | **W2 生图商用授权确认后终审** |
| privacy.html | 草案 | 填真实分析工具名（W5）+ 支付平台名（W1） |
| terms.html | 草案 | 与支付平台条款对齐（W1） |
| refund.html | 草案 | 与支付平台退款工具对齐（W1） |
| contact.html | 草案 | 换真实邮箱 |

## 全局约定

- **品牌名占位**：「Printable Cozy Coloring Pages」（描述性 SEO 文案，非品牌承诺）。
  定名后全局替换：`grep -rl "Printable Cozy Coloring Pages" site/` 一次性替换 10 个文件 + footer 版权行。
- **图片引用**：相对路径 `../assets/...`（不复制进 site/，防仓库膨胀）。部署时如需自包含目录，批量改前缀即可。
- **文案口径**（项 4）：只承诺「个人使用授权」；不承诺独家/商用权；价格 $7.99 为实验首测值（EXP-001 观察期内锁定）。
- **定价/授权改动入口**：价格在 4 处（index 3 卡片 + 各产品页 spec 表），授权文案集中在 license.html。
- **🔴 DRAFT PDF 审阅链接（2026-10-23 加）**：3 个产品页各有一行「Internal review: full draft PDF」，仅供所有者上线前审阅成品，**付费产品 PDF 不得免费可下载**。上线前必须删掉这 3 行（每页 HTML 内都有 `INTERNAL REVIEW ONLY` 注释标记，`grep -rn "INTERNAL REVIEW" site/` 一次找齐）。正式交付 = 支付平台托管文件（W1 接入时上传 assets/pdf/ 最终版）。
- **预览图序 = PDF 页序**（2026-10-23 起，三包全齐）：A/B/C 产品页 22 图均按对应 PDF 实际页序排（页序从 PDF 内嵌 JPEG 字节序提取，非生成顺序），所见即所得；Cat Moments 图廊已于 2026-10-23 晚对齐（3 锚点图移至图廊最前，逐位比对 22/22 通过）。
