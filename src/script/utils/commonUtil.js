/**
 * Created by Administrator on 2017/2/15.
 */

let commonUtil = {
    render(id, str){
        document.querySelector(id).innerHTML = str;
    },
    TotwoArry(data){
        var arr = [];
        //  ����һ��������
        for (var i = 0, len = data.length / 2; i < len; i++) {
            arr[i] = []
            //  arr�������д���i����ά����
            arr[i].push(data[i * 2]);
            //  ��arr��ÿ����ά����push data�±� 0  2 4����
            data[i * 2 + 1] && arr[i].push(data[i * 2 + 1]);
            //  �ж�data[i]�±����� ���Ҷ�������û��  �о���arr��ÿ����ά��������push data�±� 1 3 5 ����
        }
            return arr
    }

};



export default commonUtil;