# 情報工学特論 8班

## Installation & JavaScript

[Deno環境でJavaしかしたことがない人がJavaScriptを10分で覚える為の資料](https://tithub.tech/tanaka/js-ts)

## How to use

https://github.com/NITNCtanakaShoki/info-special-group-work-8/blob/0.0.1/mod.ts

```ts
import {
    Action,
    Application,
    Member,
} from "https://github.com/NITNCtanakaShoki/info-special-group-work-8/raw/0.0.1/mod.ts";

const app = new Application();

// 部屋の人数
app.env.countPerRoom = 2;

// メンバーの登録
app.members.register(
    new Member("A", ["B", "C"], ["D"]),
    new Member("B", ["A", "C"], ["D"]),
    new Member("C", ["A", "B"], ["D"]),
    // ...
);

// エージェントの登録
app.register((state, reward, app) => {
    return Action.exit;
});

// 実行
app.run();
```