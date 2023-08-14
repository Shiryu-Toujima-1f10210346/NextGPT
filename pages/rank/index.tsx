import {useState} from 'react'

export default function Home(){
    // ランキングデータの配列
    const [ranking, setRanking] = useState([
        {name: 'ばくしんち', stars: 100},
        {name: 'けだ', stars: 200},
        {name: 'ふじ', stars: 300},
    ])

    // ランキングデータを昇順に並び替える
    const sortRanking = () => {
        const newRanking = [...ranking]
        newRanking.sort((a, b) => a.stars - b.stars)
        setRanking(newRanking)
    }

    return (
        <div>
            <h1>Ranking</h1>
            <ul>
                {ranking.map((item, index) => (
                    <li key={index}>
                        <span>{item.name}:</span>
                        <span>{item.stars}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}