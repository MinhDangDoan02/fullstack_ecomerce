import React, { useEffect, useState } from 'react'
import API from '../Config/Config'
import { Link } from 'react-router-dom';

export default function List_Blog(props) {

    const [getItem , setItem] = useState([])
    useEffect (()=> {
        API.get('/blog/list')
        .then(res => {
            setItem(res.data)

        })
        .catch(function(error){
            console.log(error)
        })
    },[])
    function fetchData(){
       
        if(getItem.length > 0){
            return getItem.map((value, key)=>{
              let image = JSON.parse(value.image)
              return(
                <div className='single-blog-post' key={key}>
                    <h3>{value.title}</h3>

                    <div className='post-meta'>
                      <ul>
                        <li><i className="fa fa-user" /> Mac Doe</li>
                      <li><i className="fa fa-clock-o" /> {value.created_at}</li>
                      <li><i className="fa fa-calendar" /> {value.updated_at}</li>
                      </ul>
                      <span>
                         
                          
                    </span>
                    </div>
                     <Link href>
                    <img src={"http://localhost:5000/public/upload/blog/" + image} alt="" />
                  </Link>
                  <p>{value.description}</p>
                 <p>{value.content}</p>

                   <Link className="btn btn-primary"  to={"/blog/detail/" + value.id} >Read More</Link>

                </div>
             )

            })
        }
    }



    
  return (
     <div className="col-sm-9">
              <div className="blog-post-area">
                <h2 className="title text-center">Latest From our Blog</h2>
                {fetchData()}

             
          
              </div>
            </div>
            
  )
}
