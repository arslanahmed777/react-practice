import React,{Component} from 'react'
import axios from 'axios'
import Loader from "react-loader-spinner";
export default class Posts extends Component{
    state={
        posts:[],
        loading:false
    }
    //userId=1
    componentDidMount(){
        const {user} = this.props;
        this.setState({loading:true})
        this.getUserPostList(user.id)
    }

    getUserPostList = id =>{
        axios.get(`https://jsonplaceholder.typicode.com/posts/?userId=${id}`)
        .then((result)=>{
            this.setState({posts:result.data,loading:false})
        }).catch((err)=>{
            console.log("asf"+err)
        }).finally((res)=>{
           
        })
    }
    componentDidUpdate(pP,pS,sS){
        
        if(pP.user.id !== this.props.user.id)
        {
            this.setState({loading:true})
            this.getUserPostList(this.props.user.id)
        } 
    }
    render(){
        const {posts,loading} = this.state;
        return(
            <ul>
                {loading?  <Loader
                    type="Puff"
                    color="#00BFFF"
                    height={100}
                    width={100}
                    timeout={3000} //3 secs
                />:posts.map((post)=>{
                                return(
                                    <li key={post.id}>
                                        <span>{post.title}</span>
                                        <h5>{post.body}</h5>
                                    </li>
                                )
                })}
            </ul>
           
            
        )
    }
}
