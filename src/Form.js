import React, { Component } from 'react'
import axios from 'axios';

export default class Form extends Component {
state={
        name:'',
        email:'',
        message:'',
        sent:false

}

handleName=(e)=>{
        this.setState({name:e.target.value})
}
    
handleEmail=(e)=>{
        this.setState({email:e.target.value})
}
    
handleMessage=(e)=>{
        this.setState({message:e.target.value})
}
                 

formSubmit=(e)=>{
        e.preventDefault();

        let data = {
            name:this.state.name,
            email:this.state.email,
            message:this.state.message
        }
          

axios.post('/api/form',data)
.then(res=>{
    this.setState({sent:true,},this.resetForm())
}).catch(()=>{console.log('message not sent');})
            
}    
       
resetForm=()=>{
    this.setState({
        name:'',
        email:'',
        message:''
    })
    setTimeout(()=>{
        this.setState
        ({sent:false,})
    },3000)
    
}    

    render() {
        return (
            <div className="container">
                <form onSubmit={this.formSubmit}>
                    <div className="singleItem">
                        <label htmlFor="name">Name</label>
                        <input type="text" 
                        name="name" 
                        className="name" 
                        placeholder="your name..."
                        value={this.state.name}
                        onChange={this.handleName}
                        />
                    </div>

                    <div className="singleItem">
                        <label htmlFor="email">Email</label>
                        <input type="text" 
                        name="email" 
                        className="email" 
                        placeholder="your email..."
                        value={this.state.email}
                        onChange={this.handleEmail}
                        required
                        />
                    </div>

                    

                    <div className="textArea singleItem">
                        <label htmlFor="message">Message</label>
                        <textarea name="message" 
                        id="" cols="30" rows="5"
                        placeholder="your message..."
                        value={this.state.message}
                        onChange={this.handleMessage}
                        ></textarea>
                    </div>

                    <div className={this.state.sent ?'msg msgAppear':'msg'}>
                        Message has been sent
                    </div>


                    <div className="btn">
                        <button type="submit" >Submit</button>
                    </div>
                </form>
                
            </div>
        )
    }
}
