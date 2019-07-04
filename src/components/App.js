import React from 'react';
import { connect } from 'react-redux';
import { addRecipe,removeFromCalendar } from '../actions';



class App extends React.Component{

    doThing = () => {
        this.props.selectRecipe({})
    };


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

function mapStateToProps ({ food,calendar }) {
    // 创建星期数组
    const dayOrder = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    // 返回一个具有calendar属性的对象
    return {
        calendar: dayOrder.map((day) => ({
            day,
            meals: Object.keys(calendar[day]).reduce((meals,meal) => {
                meals[meal] = calendar[day][meal]
                    ? food[calendar[day][meal]]
                    : null;
                return meals;
            },{})
        }))
    }
}


//

function mapDispatchToProps (dispatch) {
    return {
        selectRecipe: (data) => dispatch(addRecipe(data)),
        remove: (data) => dispatch(removeFromCalendar(data))
    }
}




export default connect(mapStateToProps,mapDispatchToProps)(App);

















