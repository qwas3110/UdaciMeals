import React from 'react';
import { connect } from 'react-redux';
import { addRecipe,removeFromCalendar } from '../actions';
import { capitalize } from '../utils/helpers';
import CalendarIcon from 'react-icons/lib/fa/calendar-plus-o';
// 导入模态框
import Modal from 'react-modal';
// 导入right-icon 图标
import ArrowRightIcon from 'react-icons/lib/fa/arrow-circle-right';
// 导入 Loading 组件
import Loading from 'react-loading';
// API 调用文件
import { fetchRecipes } from '../utils/api';

import FoodList from './FoodList'
//导入食物制作清单
import ShoppingList from './ShoppingList';


//openFoodModal 打开模态框
// 将在本地组件上设置状态，foodModalOpen变为true，然后传入meal和day

//closeFoodModal 关闭模态框


//searchFood 调用api，搜索食谱等
// 将loadingFood 设为true,
// fetchRecipes，向它传递输入值,我们将获得一个食物数组,
// 解析后，我们设置食物的本地状态,将此状态保存到本地组件状态



class App extends React.Component {

    state = {
        foodModalOpen: false,
        meal:null,
        day: null,
        food:null,
        loadingFood: false,
        ingredientsModalOpen: false,
    };

    openFoodModal = ({ meal, day }) => {
        this.setState(() => ({
            foodModalOpen: true,
            meal,
            day
        }))
    };

    closeFoodModal = () => {
      this.setState(() => ({
          foodModalOpen: false,
          meal: null,
          day: null,
          food: null
      }))
    };


    searchFood = (e) => {
        if (!this.input.value) {
            return;
        }

        e.preventDefault();

        this.setState(() => ({ loadingFood: true }))

        fetchRecipes(this.input.value)
            .then((food) => this.setState(() => ({
                food,
                loadingFood: false,
            })))


    };

    //食物制作清单方法
    //openIngredientsModal 开启
    //closeIngredientsModal 关闭
    // generateShoppingList 生成清单
    openIngredientsModal = () => this.setState(() => ({ ingredientsModalOpen: true }))
    closeIngredientsModal = () => this.setState(() => ({ ingredientsModalOpen: false }))
    generateShoppingList = () => {
        //对calendar 使用Reduce方法，将获得所有餐饭并全部推入一个数组中
        // 将此数组展开
        return this.props.calendar.reduce((result, { meals }) => {
            const { breakfast, lunch, dinner } = meals

            breakfast && result.push(breakfast)
            lunch && result.push(lunch)
            dinner && result.push(dinner)

            return result
        }, [])
            .reduce((ings, { ingredientLines }) => ings.concat(ingredientLines), [])
            //结束后，当我们调用 generateShopingList我们将获得是包含这些餐饮所有不用食材的一个数组
    }





    render() {


        const { foodModalOpen, loadingFood, food,ingredientsModalOpen  } = this.state;
        const { calendar, remove, selectRecipe } = this.props;
        const mealOrder = ['breakfast', 'lunch', 'dinner'];


        return (
            <div className='container'>

                {/*添加一个导航栏*/}
                <div className='nav'>
                    <h1 className='header'>UdaciMeals</h1>
                    <button
                        className='shopping-list'
                        onClick={this.openIngredientsModal}
                        >
                        Shopping List
                    </button>
                </div>

                <ul className='meal-types'>
                    {mealOrder.map((mealType) => (
                        <li key={mealType} className='subheader'>
                            {capitalize(mealType)}
                        </li>
                    ))}
                </ul>

                <div className='calendar'>
                    <div className='days'>
                        {calendar.map(({ day }) => <h3 key={day} className='subheader'>{capitalize(day)}</h3>)}
                    </div>
                    <div className='icon-grid'>
                        {calendar.map(({ day, meals }) => (
                            <ul key={day}>
                                {mealOrder.map((meal) => (
                                    <li key={meal} className='meal'>
                                        {meals[meal]
                                            ? <div className='food-item'>
                                                <img src={meals[meal].image} alt={meals[meal].label}/>
                                                <button onClick={() => remove({meal, day})}>Clear</button>
                                            </div>
                                            // 当被点击时打开模态框,传入meal day ，都来自我们的映射
                                            : <button className='icon-btn'
                                                      onClick={() => this.openFoodModal({meal,day})}
                                                    >
                                                <CalendarIcon size={30}/>
                                            </button>}
                                    </li>
                                ))}
                            </ul>
                        ))}
                    </div>
                </div>
                {/*渲染一个模态框,当foodModalOpen为true时，则打开此模态框*/}
                {/*当我们尝试关闭它时 onRequestClose={this.closeFoodModal} 将运行，将改为false，关闭模态框*/}
                {/*在这里做的是渲染一些div*/}
                <Modal
                    className='modal'
                    overlayClassName='overlay'
                    isOpen={foodModalOpen}
                    onRequestClose={this.closeFoodModal}
                    contentLabel='Modal'
                >
                    <div>
                        {loadingFood === true
                            ? <Loading delay={200} type='spin' color='#222' className='loading' />
                            : <div className='search-container'>
                                <h3 className='subheader'>
                                    Find a meal for {capitalize(this.state.day)} {this.state.meal}.
                                </h3>
                                <div className='search'>
                                    <input
                                        className='food-input'
                                        type='text'
                                        placeholder='Search Foods'
                                        ref={(input) => this.input = input}
                                    />
                                    {/*每当按钮被点击时.渲染右箭头图标。运行searchFood*/}
                                    {/*调取fetchRecipes获得食物后。加载到本地状态中*/}
                                    <button
                                        className='icon-btn'
                                        onClick={this.searchFood}>
                                        <ArrowRightIcon size={30}/>
                                    </button>
                                </div>
                                {/*food不为null，我们渲染食物清单*/}
                                {/*并向它传递当选中特定项时要做什么， selectRecipe*/}
                                {/*当selectRecipe运行后将调用this.closeFoodModal()，关闭模态框*/}
                                {food !== null && (
                                    <FoodList
                                        food={food}
                                        onSelect={(recipe) => {
                                            selectRecipe({ recipe, day: this.state.day, meal: this.state.meal })
                                            this.closeFoodModal()
                                        }}
                                    />)}
                            </div>}
                    </div>
                </Modal>
                {/*ingredientsModalOpen为true的时候打开*/}
                {/*onRequestClose通过请求来关闭它*/}
                <Modal
                    className='modal'
                    overlayClassName='overlay'
                    isOpen={ingredientsModalOpen}
                    onRequestClose={this.closeIngredientsModal}
                    contentLabel='Modal'
                >
                    {ingredientsModalOpen && <ShoppingList list={this.generateShoppingList()}/>}
                </Modal>

            </div>
        )
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

















