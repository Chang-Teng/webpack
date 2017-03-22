/**
 * Created by Administrator on 2017/2/15.
 */

let commonUtil = {
    render(id, str){
        document.querySelector(id).innerHTML = str;
    },
    TotwoArry(data){
        var arr = [];
        //  定义一个空数组
        for (var i = 0, len = data.length / 2; i < len; i++) {
            arr[i] = []
            //  arr空数组中创建i个二维数组
            arr[i].push(data[i * 2]);
            //  往arr中每个二维数组push data下标 0  2 4对象，
            data[i * 2 + 1] && arr[i].push(data[i * 2 + 1]);
            //  判断data[i]下标奇数 并且对象中有没有  有就往arr中每个二维数组中再push data下标 1 3 5 对象，
        }
            return arr
    }

};



export default commonUtil;