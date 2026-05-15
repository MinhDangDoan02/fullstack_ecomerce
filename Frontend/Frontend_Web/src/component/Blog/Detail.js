
import React, { useEffect, useState } from 'react'
import API from '../Config/Config'
import { useParams } from 'react-router-dom'
import Comment from './Comment'
import ListCmt from './ListCmt'
import Rate from './Rate'

export default function Detail(props) {
   let params = useParams() 

    const [getItemDetail, setItemDetail] = useState()
    const [listComment , setListComment] = useState([])
   

       
    

    useEffect(()=>{
        API.get('/blog/detail/' + params.id)     
        .then(res =>{
            setItemDetail(res.data)
        })  
        .catch(function(error){
            console.log(error)
        })

        fetchComments()
    },[params.id])

    function fetchComments(){
      API.get('/blog/comments/' + params.id)
        .then(res => {
          setListComment(res.data.data || [])
        })
        .catch(error => {
          console.log(error)
        })
    }

    function getCmt(dataCmt){
       console.log("data_cmt:", dataCmt)
       setListComment(state => [...state, dataCmt])
    }


      
  

    function fetchData(){
          if (getItemDetail ) {
             let image = JSON.parse(getItemDetail.image)
            return (
               
                <div className='single-blog-post'>
                    <h3>{getItemDetail.title}</h3>
                    <div className='post-meta'>
                        <ul>
                            <li><i className="fa fa-user" /> Mac Doe</li>
                            <li><i className="fa fa-clock-o" /> {getItemDetail.created_at}</li>
                            <li><i className="fa fa-calendar" /> {getItemDetail.updated_at}</li>
                        </ul>
                    </div>
                    <div>
                        <img src={"http://localhost:5000/public/upload/blog/" + image} alt="" />
                    </div>
                    <p>{getItemDetail.description}</p>
                </div>
            )

        }
      
    }
      
 
  return (
    <div className="col-sm-9">
        <div className="blog-post-area">
          <h2 className="title text-center">Latest From our Blog</h2>
          {fetchData()}
        </div>{/*/blog-post-area*/}
      
        <div className="socials-share">
          <a href><img src="images/blog/socials.png" alt="" /></a>
        </div>{/*/socials-share*/}
        {/* <div class="media commnets">
						<a class="pull-left" href="#">
							<img class="media-object" src="images/blog/man-one.jpg" alt="">
						</a>
						<div class="media-body">
							<h4 class="media-heading">Annie Davis</h4>
							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
							<div class="blog-socials">
								<ul>
									<li><a href=""><i class="fa fa-facebook"></i></a></li>
									<li><a href=""><i class="fa fa-twitter"></i></a></li>
									<li><a href=""><i class="fa fa-dribbble"></i></a></li>
									<li><a href=""><i class="fa fa-google-plus"></i></a></li>
								</ul>
								<a class="btn btn-primary" href="">Other Posts</a>
							</div>
						</div>
					</div> */}{/*Comments*/}
          {/* getCmt={getCmt}
          getCmt={getCmt} */}

               <Rate id_blog_rate = {params.id }></Rate>

     
      
        <ListCmt id_blog_cmt = {params.id} data_listComment = {listComment} getCmt={getCmt}></ListCmt>   
       <Comment id_blog ={params.id} getCmt={getCmt}  ></Comment>
      </div>
  )
}
