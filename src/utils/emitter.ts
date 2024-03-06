import mitt from 'mitt'

//调用mitt来得到emitter，emitter可以绑定和触发事件
const emitter = mitt()

//暴露
export default emitter
