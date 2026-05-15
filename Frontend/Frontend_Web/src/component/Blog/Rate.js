import React, { useEffect } from 'react'
import { useState } from "react";
import { Rating } from "react-simple-star-rating";
import API from '../Config/Config';
import List_Blog from './List_Blog';

export default function Rate(props) {
  const [rating, setRating] = useState();
   useEffect(() => {
    API.get("/blog/rate/" + props.id_blog_rate)
      .then(res => {
        const Object_data = res.data.data
        console.log("object_data_rate", Object_data)
        if(Object_data){
          const dataRate = Object.values(Object_data)
   
              if (dataRate && dataRate.length > 0) {
                let sum = 0; 
                // for (var i = 0; i < dataRate.length; i++) { 
                //   sum += dataRate[i].rate
                // }
                // console.log("summ", sum)
                // const sum_tb = sum / dataRate.length
                // setRating(Math.round(sum_tb))
               (dataRate.map((value, index) =>{
                  if(value.rate){
                    sum +=value.rate  
                  }
                   console.log("summ", sum)
                   const sum_tb = sum / dataRate.length
                  setRating(Math.round(sum_tb))
                }))
              }
            }
            })
          .catch(function(error){
                console.log(error)
            })
        },[])
    

  const handleRating = (rate) => {
    console.log(rate)
    setRating(rate)

     let auth = localStorage.getItem("user")
      if(auth){
        auth = JSON.parse(auth)
      }

      if(!auth){
        alert("vui long dang nhap de danh gia")
      }
      let token = JSON.parse(localStorage.getItem("token"))
       let config = { 
                headers: { 
                'Authorization': 'Bearer '+ token,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
                } 
            };
      const formDataRate = new FormData()
      formDataRate.append("blog_id" , props.id_blog_rate)
      formDataRate.append("user_id", auth.id)
      formDataRate.append("rate",rate)

      API.post("/blog/rate/" + props.id_blog_rate,formDataRate,config)
      .then(res =>{
        alert("danh gia thanh cong")
        console.log("Res",res)
      })
    



   
  };

  return (
    <div>
      	<div class="rating-area">
						<ul class="ratings">
							<li class="rate-this">Rate this item:</li>
							<li>
								<Rating
        onClick={handleRating}
        initialValue={rating}
        size={20}
        transition
        fillColor="gold"
        emptyColor="gray"
      />
							</li>
							<li class="color">({rating})</li>
						</ul>
						
					</div>

  
      
    
    </div>
  );
}

