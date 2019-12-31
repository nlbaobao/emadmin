import {observable,action} from 'mobx'
class PublicStatus {
    @observable file = '';
    @observable richText = '';
    @observable productFile='';
    @observable imgIp='http://2hq8388555.goho.co/wx';

    @action 
    setFile  = (value)=>{
        this.file = value
    }
    @action
    setRichText = (value)=>{
        this.richText = value
    }
    @action
    setProdutFile = (file)=>{
        this.productFile = file
    }
    
}
const test = new PublicStatus();
export default test