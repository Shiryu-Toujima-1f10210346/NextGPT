import createRanking from "../../repo/rankingRepo";


export default function Home() {
   return (
         <div>
            <button onClick={createRanking}>ランキング作成:デバッグ用</button>
            </div>
   )
}