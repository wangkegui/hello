import React, { Component } from 'react';
import { Flex, WhiteSpace, List } from 'antd-mobile';
import resource from 'util/resource'
import style from './index.css';
const logo = null;
console.log(style)
const Item = List.Item;
const Brief = Item.Brief;
const title = [0,0,0,0,0,0,0,0,0,0,0,]
const PlaceHolder = ({ className = '', ...restProps }) => (
    <div className={`${className} placeholder`} {...restProps}>Block</div>
);

class App extends Component {
    constructor(props){
        super(props);
    }
    getUrlTestFetch = () => {
        resource.get('/cgi-bin/ticket/getticket?access_token=20_SxeZmluBRK6qLGR8iaHuwNOvXjhvVZ7hl5-PItzOnpKu61GIfDsBKnDBKCJBAKxmrrPUwJAO0u-3e1yxTRkT8oQPTbhGBlRrp4r4XCFYIdfDYMtmb9vhy8ue08dGPg7KO7lG6hsszXxQ1CBGXXTaAGAJJF&type=jsapi').then((res) => {
            console.log(res)
        })
    }
    componentDidMount(){
        this.getUrlTestFetch()
    }
    render() {
        return (
            <div className="flex-container">
                <div className="sub-title">Basic</div>
                <Flex>
                    <Flex.Item><PlaceHolder /></Flex.Item>
                    <Flex.Item><PlaceHolder /></Flex.Item>
                </Flex>
                <WhiteSpace size="lg" />
                <Flex>
                    <Flex.Item><PlaceHolder /></Flex.Item>
                    <Flex.Item><PlaceHolder /></Flex.Item>
                    <Flex.Item><PlaceHolder /></Flex.Item>
                </Flex>
                <WhiteSpace size="lg" />
                <Flex>
                    <Flex.Item><PlaceHolder /></Flex.Item>
                    <Flex.Item><PlaceHolder /></Flex.Item>
                    <Flex.Item><PlaceHolder /></Flex.Item>
                    <Flex.Item><PlaceHolder /></Flex.Item>
                </Flex>
                <WhiteSpace size="lg" />
                <List renderHeader={() => 'Customized Right Side（Empty Content / Text / Image）'} className="my-list">
                    {
                        title.map((obj) =>{
                            return (
                                <Item extra="10:30" align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" multipleLine>
                                    这里是測試 <Brief>subtitle</Brief>
                                </Item>
                            )
                        })
                    }
                </List>
            </div>
        );
    }
}

export default App;




