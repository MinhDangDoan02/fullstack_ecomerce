import React from 'react'

export default function Profile() {
  return (
    <div className="flex-grow-1 p-4">
        <h1 className="text-success">User Profile</h1>
        <div className="card shadow-sm mt-4 p-4">
          <div className="row">
            <div className="col-md-4 text-center">
              <img src="https://img.icons8.com/fluency/200/000000/user-male-circle.png" className="rounded-circle img-fluid" alt="User Avatar" />
              <h3 className="mt-3">John Doe</h3>
              <p className="text-muted">Administrator</p>
              <button className="btn btn-success">Edit Profile</button>
            </div>
            <div className="col-md-8">
              <h4 className="text-success">Profile Information</h4>
              <table className="table">
                <tbody><tr>
                    <th>Full Name</th>
                    <td>John Doe</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>john@example.com</td>
                  </tr>
                  <tr>
                    <th>Role</th>
                    <td>Administrator</td>
                  </tr>
                  <tr>
                    <th>Phone</th>
                    <td>+1 234 567 890</td>
                  </tr>
                  <tr>
                    <th>Address</th>
                    <td>123 Green Street, New York, USA</td>
                  </tr>
                </tbody></table>
            </div>
          </div>
        </div>
      </div>
  )
}
