import data1 from '../data/fonte_de_dados_1.json'
import data2 from '../data/fonte_de_dados_2.json'
import data3 from '../data/fonte_de_dados_3.json'
import data4 from '../data/fonte_de_dados_4.json'
import data5 from '../data/fonte_de_dados_5.json'

export const arrData = [
    {
        id: 1,  
        name: 'Dados 1',
        data: data1,
        xkey: ['nome','categoria','ano','mes','cor','fabricante'],
        ykey: ['preco','quantidade']
    },
    {
        id: 2,
        name: 'Dados 2',
        data: data2,
        xkey: ['data','cliente','ano','mes','cor','fabricante','categoria'],
        ykey: ['valor_total','itens']
    },
    {
        id: 3,
        name: 'Dados 3',
        data: data3,
        xkey: ['nome','departamento','idade','ano','mes','cor','fabricante'],
        ykey: ['salario']
    },
    {
        id: 4,
        name: 'Dados 4',
        data: data4,
        xkey: ['nome','departamento','duracao_meses','ano_inicio','mes_inicio','cor','fabricante'],
        ykey: ['orcamento']
    },
    {
        id: 5,
        name: 'Dados 5',
        data: data5,
        xkey: ['data','conta_id','tipo','ano','mes','categoria','cor','fabricante'],
        ykey: ['valor']
    },
]