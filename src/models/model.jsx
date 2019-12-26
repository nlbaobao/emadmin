import {observable,action} from 'mobx'
class Test {
    @observable test = '';

    @action 
    setTest  = (value)=>{
        this.test = value
    }
}
const test = new Test();
export default test