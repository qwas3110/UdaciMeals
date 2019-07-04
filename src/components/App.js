import React from 'react';
import { connect } from 'react-redux';



class App extends React.Component{


    render() {

        console.log('Props:',this.props);

        return (
            <div>
                Hello World!
            </div>
        );
    }
}


// 此函数将我们Redux 状态映射到组件props

function mapStateToProps(calendar) {
    // 创建星期数组
    const dayOrder = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    // 返回一个具有calendar属性的对象
    return {
        calendar: dayOrder.map((day) => ({
            day,
            meals: Object.keys(calendar[day]).reduce((meals,meal) => {
                meals[meal] = calendar[day][meal]
                    ? calendar[day][meal]
                    : null;
                return meals;
            },{})
        }))
    }
}



export default connect(mapStateToProps)(App);

















