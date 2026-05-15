import React from 'react'
import { Link } from 'react-router-dom'

export default function Menuleft_Account() {
  return (
      <div className="col-sm-3">
          <div className="left-sidebar">
            <h2>Account</h2>
            <div className="panel-group category-products" id="accordian">{/*category-productsr*/}
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h4 className="panel-title"><Link to={"/account/member/product_add"} href="#">account</Link></h4>
                </div>
              </div>
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h4 className="panel-title"><Link to={"/account/member/myproduct"} href="#">My product</Link></h4>
                </div>
              </div>
            </div>{/*/category-products*/}
          </div>
        </div>
  )
}
