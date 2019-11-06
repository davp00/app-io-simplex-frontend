import React, { Component } from 'react';


export default class SimplexIterationData extends Component{
    render() {
        const { data } = this.props;

        return (
            <div className="ant-table ant-table-default ant-table-bordered ant-table-empty ant-table-scroll-position-left ">
                <div className="ant-table-content">
                    <div className="ant-table-body">
                        <table className="katex3 table-simplex">
                            <thead className="ant-table-thead">
                            <tr >
                                <th className='text-center'>CB</th>
                                <th className='text-center'>VS</th>
                                {
                                    data.matrix.map((element,y) =>
                                    {
                                        return <th key={`th-${y}`} className='text-center'>{element.name.toUpperCase()}</th>
                                    })
                                }
                            </tr>
                            </thead>
                            <tbody className="ant-table-tbody ">
                            {
                                this.renderData(data)
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }

    renderData = (data) =>
    {
        let rows = [];
        for (let y = 0 ; y < data.cb.length ; y++)
        {
            let tds = [];

            tds.push(<td key={`td-cb-${y}`}>{data.cb[y]}</td>)
            tds.push(<td key={`td-vsol-${y}`} >{data.vs[y]}</td>);

            for (let x = 0 ; x < data.matrix.length ; x++)
            {
                tds.push(
                    <td key={`td-${x}-${y}`}
                        className={data.in_out && data.in_out.in === x && data.in_out.out === y ? 'piv' : ''}>
                        {data.matrix[x].values[y]}
                    </td>)
            }
            rows.push(
                <tr key={`tr-${y}`}>
                    {tds}
                </tr>
            )
        }

        rows.push(
            <tr key={'tr-zj'}>
                <td>&nbsp;</td>
                <td>Z</td>
                {
                    data.zj.map((element, i) =>
                    {
                        return <td key={`td-zj-${i}`}>{element}</td>
                    })
                }
            </tr>
        );

        rows.push(
            <tr key={'tr-cj_zj'}>
                <td>&nbsp;</td>
                <td>CJ - ZJ</td>
                <td>&nbsp;</td>
                {
                    data.cj_zj.map((element, i) =>
                    {
                        return <td key={`td-cj_zj-${i}`}>{element}</td>
                    })
                }
            </tr>
        );

        return rows;
    }
}
