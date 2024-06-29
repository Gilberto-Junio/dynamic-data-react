import {
    BarChart,
    Bar,
    Rectangle,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

type DataItem = {
    [key: string]: any;
};

type Props = {
    dataChartReduce: DataItem[],
    xKey: string,
    yKey: string
    detail:string
    detailKeys?: string[]
}



function Chart({ dataChartReduce, xKey, yKey, detail, detailKeys}: Props) {
    const tailwindColors = [
        "#b91c1c",
        "#c2410c",
        "#ca8a04",
        "#a16207",
        "#15803d",
        "#0f766e",
        "#0369a1",
        "#075985",
        "#1d4ed8",
        "#7c3aed",
        "#9333ea",
        "#a21caf",
        "#be185d",
        "#9d174d",
        "#166534",
      ];

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                width={500}
                height={300}
                data={dataChartReduce}
            >
                <CartesianGrid strokeDasharray="2 2" />
                <XAxis dataKey={xKey} />
                <YAxis dataKey={yKey}/>
                <Tooltip />
                <Legend />
                {
                    detail != 'empty' && detailKeys ? (
                        detailKeys.map((key, index) => (
                            <Bar key={index} dataKey={key} stackId="a" fill={tailwindColors[index]} label={{ position: 'top' }}/>
                        ))
                    ) : (
                        <Bar dataKey={yKey} fill="#b91c1c" label={{ position: 'top', fill: '#b91c1c' }} activeBar={<Rectangle fill="#f87171" />} />
                    )
                }
            </BarChart>
        </ResponsiveContainer>
    )
}

export default Chart