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

function Table({ dataChartReduce, xKey, yKey, detail, detailKeys }: Props) {
    return (
        <div className="w-full mt-4 overflow-y-auto">
            <table className="w-full h-auto bg-gray-100">
                <caption className="caption-bottom m-5">Soma de {yKey[0].toUpperCase() + yKey.substring(1)} por {xKey[0].toUpperCase() + xKey.substring(1)}{detail != 'empty' && detailKeys && ' detalhado por ' + detail}</caption>
                <thead>
                    <tr className="font-bold">
                        <th className="text-left w-[40%] p-3 border-b border-r border-gray-300">{xKey[0].toUpperCase() + xKey.substring(1)}</th>
                        {detail != 'empty' && detailKeys ? (
                            detailKeys.map((key) => (
                                <th key={key} className="text-left p-3 border-b border-gray-300">{key[0].toUpperCase() + key.substring(1)}</th>
                            ))
                        ) : (
                            <th className="text-left p-3 border-b border-gray-300">{yKey[0].toUpperCase() + yKey.substring(1)}</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {dataChartReduce.map((item, index) => (
                        <tr key={index}>
                            <td className="font-medium p-3 border-b border-r border-gray-300">{item[xKey]}</td>
                            {detail != 'empty' && detailKeys ? (
                                detailKeys.map((key) => (
                                    <td key={key} className="text-left p-3 border-b border-gray-300">{item[key] != 0 && item[key]}</td>
                                ))
                            ) : (
                                <td className="text-left p-3 border-b border-gray-300">{item[yKey]}</td>
                            )}
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={1} className="text-left font-bold p-3 border-b border-r border-gray-300">Total</td>
                        {detail != 'empty' && detailKeys ? (
                            detailKeys.map((key) => (
                                <td key={key} className="text-left font-bold p-3 border-b border-gray-300">
                                    {dataChartReduce.reduce((sum, item) => sum + (item[key] || 0), 0)}
                                </td>
                            ))
                        ) : (
                            <td className="text-left font-bold p-3 border-b border-gray-300">
                                {dataChartReduce.reduce((sum, item) => sum + item[yKey], 0)}
                            </td>
                        )}
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default Table
