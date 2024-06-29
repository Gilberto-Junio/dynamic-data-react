import { arrData } from "./data/importData"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select"
import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./components/ui/radio-group";
import { Label } from "./components/ui/label";
import Chart from "./components/Chart";
import Table from "./components/Table";

type DataItem = {
  [key: string]: any;
};

type DataSet = {
  id: number;
  name: string;
  data: DataItem[];
  xkey: string[];
  ykey: string[];
};

function App() {
  const [view, setView] = useState<string>('grafico');
  const [dataChart, setDataChart] = useState<DataItem[]>([]);
  const [dataChartReduce, setDataChartReduce] = useState<DataItem[]>([]);
  const [dataXKeys, setDataXKeys] = useState<string[]>([]);
  const [datayKeys, setDataYKeys] = useState<string[]>([]);
  const [xKey, setXKey] = useState('');
  const [yKey, setYKey] = useState('');
  const [detail, setDetail] = useState('empty');
  const [detailKeys, setDetailKeys] = useState<string[]>([]);

  const changeData = (obj: any) => {
    setDetail('empty')
    const objData: DataSet = JSON.parse(obj)
    setDataXKeys(objData.xkey);
    setDataYKeys(objData.ykey);
    setDataChart(objData.data);
    setXKey(objData.xkey[0]);
    setYKey(objData.ykey[0]);
  }

  useEffect(() => {
    if (arrData.length > 0) {
      changeData(JSON.stringify(arrData[0]));
    }
  }, []);

  useEffect(() => {
    if (xKey && yKey && dataChart.length > 0) {
      const groupedData = dataChart.reduce((acc, item) => {
        const key = item[xKey];
        if (!acc[key]) {
          acc[key] = { [xKey]: key, [yKey]: 0 };
        }
        if (detail != 'empty') {
          const detailKey = item[detail];
          if (!acc[key][detailKey]) {
            acc[key][detailKey] = 0;
          }
          acc[key][detailKey] += item[yKey];
        }
        acc[key][yKey] += item[yKey];

        return acc;
      }, {} as Record<string, Record<string, any>>);

      const allDetailKeys = new Set<string>();
      Object.values(groupedData).forEach(item => {
        Object.keys(item).forEach(key => {
          if (key !== xKey && key !== yKey) {
            allDetailKeys.add(key);
          }
        });
      });

      const allDetailKeysArray = Array.from(allDetailKeys);
      setDetailKeys(allDetailKeysArray);

      const filledGroupedData = Object.values(groupedData).map(item => {
        allDetailKeysArray.forEach(key => {
          if (!item[key]) {
            item[key] = 0;
          }
        });
        return item;
      });

      setDataChartReduce(filledGroupedData);
    }
  }, [xKey, yKey, detail, dataChart]);

  return (
    <>
      <div className="w-screen h-screen flex flex-col justify-center items-center bg-gray-100 lg:bg-gray-300">
        <div className="w-full lg:w-[80vw] flex flex-col flex-wrap lg:flex-row justify-start items-center mt-10 mb-5 lg:mt-0 space-y-3 lg:space-y-0 lg:space-x-3 lg:p-5 lg:rounded-xl bg-gray-100">
          <div className="flex flex-col">
            <span className="m-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Fonte de dados</span>
            <Select defaultValue={JSON.stringify(arrData[0])} onValueChange={changeData}>
              <SelectTrigger className="w-[80vw] lg:w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent >
                {arrData.map((data) => (
                  <SelectItem key={data.id} value={JSON.stringify(data)}>{data.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col">
            <span className="m-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Visualizar por (eixo X)</span>
            <Select value={xKey} onValueChange={(value: string) => setXKey(value)}>
              <SelectTrigger className="w-[80vw] lg:w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {dataXKeys &&
                  dataXKeys.filter(key => key != detail)
                    .map((key) => (
                      <SelectItem key={key} value={key}>{key[0].toUpperCase() + key.substring(1)}</SelectItem>
                    ))
                }
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col">
            <span className="m-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Somar por (eixo Y)</span>
            <Select value={yKey} onValueChange={(value: string) => setYKey(value)}>
              <SelectTrigger className="w-[80vw] lg:w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {datayKeys &&
                  datayKeys.map((key) => (
                    <SelectItem key={key} value={key}>{key[0].toUpperCase() + key.substring(1)}</SelectItem>
                  ))
                }
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col">
            <span className="m-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Detalhar por</span>
            <Select value={detail} onValueChange={(value: string) => setDetail(value)}>
              <SelectTrigger className="w-[80vw] lg:w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem key="empty" value="empty">
                  Nenhum
                </SelectItem>
                {dataXKeys &&
                  dataXKeys.filter(key => key != xKey)
                    .map((key) => (
                      <SelectItem key={key} value={key}>{key[0].toUpperCase() + key.substring(1)}</SelectItem>
                    ))
                }
              </SelectContent>
            </Select>
          </div>
          <div className="pt-3">
            <RadioGroup className="flex space-x-6" defaultValue={view} onValueChange={(value: string) => setView(value)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="grafico" id="grafico" />
                <Label htmlFor="grafico">Ver Gráfico</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="tabela" id="tabela" />
                <Label htmlFor="tabela">Ver Tabela</Label>
              </div>
            </RadioGroup>
          </div>

        </div>
        <div className="flex flex-col  justify-center p-2 md:p-10 w-full h-full lg:w-[80vw] lg:h-[80vh] lg:rounded-xl bg-gray-100">
          <div className="flex w-full h-full">
            {view == 'grafico' ? (
              dataChartReduce.length > 0 && (
                <Chart dataChartReduce={dataChartReduce} detail={detail} detailKeys={detailKeys} xKey={xKey} yKey={yKey} />
              )
            ) : (
              <Table dataChartReduce={dataChartReduce} detail={detail} detailKeys={detailKeys} xKey={xKey} yKey={yKey} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
