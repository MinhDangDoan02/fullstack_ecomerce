import React, { useEffect, useState } from 'react'
import API from '../Config/Config'
import Comment from './Comment'
export default function ListCmt(props) {

  const [replyId, setReplyId] = useState()
  console.log("data listcmt" , props.data_listComment)






 

  function fetchData(){
    if(props.data_listComment && props.data_listComment.length > 0){
      return props.data_listComment.map((value, index) =>{
        if(value.id_comment == 0 ){
        return ( 
           <li className="media" key={value.id}>
        <a className="pull-left" href="#">
          <img className="media-object" src={"http://localhost/laravel8/laravel8/public/upload/user/avatar/" + value.image_user} alt="" />
        </a>
        <div className="media-body">
          <ul className="sinlge-post-meta">
            <li>
              <i className="fa fa-user" />
              {value.name_user}
            </li>
            <li>
              <i className="fa fa-clock-o" /> {value.created_at}
            </li>
            <li>
              <i className="fa fa-calendar" /> {value.updated_at}
            </li>
          </ul>
          <p>
           {value.comment}
          </p>
          <a className="btn btn-primary" href="" onClick={onClickReply}>
            <i className="fa fa-reply" />
            Replay
          </a>
          {formReply()}

            {props.data_listComment.map(child => {
                  if(child.id_comment === value.id){
                    return (
                      <li className="media second-media" key={child.id}>
                        <div className="media-body">
                          <ul className="sinlge-post-meta">
                            <li><i className="fa fa-user" /> {child.name_user}</li>
                            <li><i className="fa fa-clock-o" /> {child.created_at}</li>
                          </ul>

                          <p>{child.comment}</p>
                          <a class="btn btn-primary" href=""><i class="fa fa-reply" ></i>Replay</a>
                       
                        </div>
                      </li>
                    )
                  }
                })}

                



          
        </div>
      </li>
      )
    }
  
      function onClickReply(e){
        e.preventDefault()
        setReplyId(value.id)
      }
      function formReply(){
        if(replyId == value.id){
          return(
            <Comment id_blog={props.id_blog_cmt} id_comment ={value.id} getCmt={props.getCmt}></Comment>
          )
        }
      }
  
      }) 
    }

  }

  return (

  <div className="response-area">
    <h2>  RESPONSES</h2>
    <ul className="media-list">
      {fetchData()}
     
						
						
    </ul>
  </div>


  )
}
