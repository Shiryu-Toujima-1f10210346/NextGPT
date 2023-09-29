# チーム実習3　グループ4　チーム5　教育

## ↓↓↓ ロゴをクリックしてサイトにアクセス↓↓↓

[![ncrates](https://github.com/Shiryu-Toujima-1f10210346/NextGPT/blob/master/public/logo2.png)](https://wakarates.vercel.app/)

# 欲しい機能がある場合

## **開発者にリスペクトを込めて送ってください**｡

 [feature requestはここから](https://github.com/Shiryu-Toujima-1f10210346/NextGPT/issues/new?assignees=&labels=feature-request&projects=&template=feature_request.yml)


 思うがまま書きなぐってもらって大丈夫です｡

# バグを見つけた場合

[bug reportはここから](https://github.com/Shiryu-Toujima-1f10210346/NextGPT/issues/new?assignees=&labels=bug&projects=&template=bug_report.yml)

 ｢どこのページで｣  ｢何をしたら｣  ｢どうなった｣ を出来るだけ具体的に書いていただけると助かります｡

# 改善案がある場合

 [improve requestはここから](https://github.com/Shiryu-Toujima-1f10210346/NextGPT/issues/new?assignees=&labels=enhancement&projects=&template=improve-request.md&title=)




1. If you don’t have Node.js installed, [install it from here](https://nodejs.org/en/) (Node.js version >= 14.6.0 required)

2. Clone this repository

3. Navigate into the project directory

   ```bash
   $ cd NextGPT
   ```

4. Install the requirements

   ```bash
   $ npm install
   ```

5. Make a copy of the example environment variables file

   On Linux systems: 
   ```bash
   $ cp .env.example .env
   ```
   On Windows:
   ```powershell
   $ copy .env.example .env
   ```
6. Add your [API key](https://platform.openai.com/account/api-keys) to the newly created `.env` file

7. Run the app

   ```bash
   $ npm run dev
   ```

You should now be able to access the app at [http://localhost:3000](http://localhost:3000)! For the full context behind this example app, check out the [tutorial](https://platform.openai.com/docs/quickstart).
