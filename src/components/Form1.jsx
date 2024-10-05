import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Form = () => {
  const [input, setInput] = useState({});
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const LastItemOfIndex = currentPage * itemsPerPage;
  const FirstItemOfIndex = LastItemOfIndex - itemsPerPage;
  const currentItems = list.slice(FirstItemOfIndex, LastItemOfIndex);
  const totalPages = Math.ceil(list.length / itemsPerPage);

  function handleInput(e) {
    let { name, value } = e.target;
    setInput({ ...input, [name]: value });
  }

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("data")) || [];
    setList(data);
  }, []);

  function handleSubmition(e) {
    e.preventDefault();

    let newList = [...list, input];
    setList(newList);
    localStorage.setItem("data", JSON.stringify(newList));
    setInput({});
  }

  // Delete Data
  function deleteData(index) {
    const newList = list.filter((_, i) => i !== index);
    setList(newList);
    localStorage.setItem("data", JSON.stringify(newList));
  }

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 text-primary">User Registration</h2>
      <div className=" justify-content-center">
        <div className="col">
          <div className="card p-4 shadow-lg border-0">
            <form onSubmit={handleSubmition}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label text-muted">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={input.name || ""}
                  onChange={handleInput}
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label text-muted">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={input.email || ""}
                  onChange={handleInput}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label text-muted">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={input.password || ""}
                  onChange={handleInput}
                  placeholder="Enter a password"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="message" className="form-label text-muted">
                  Message
                </label>
                <textarea
                  className="form-control"
                  name="message"
                  value={input.message || ""}
                  onChange={handleInput}
                  rows="3"
                  placeholder="Enter a message"
                />
              </div>

              <div className="text-center">
                <button type="submit" className="btn btn-primary w-100">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* User data display */}
      {list.length > 0 && (
        <div className="mt-5">
          <h4 className="text-center mb-4">Submitted Data</h4>
          <div className="table-responsive">
            <table className="table table-hover table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Message</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((val, i) => (
                    <tr key={i}>
                      <td>{val.name}</td>
                      <td>{val.email}</td>
                      <td>{val.password}</td>
                      <td>{val.message}</td>
                      <td className="text-center">
                        <button
                          onClick={() => deleteData(i)}
                          className="btn btn-sm btn-danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <nav aria-label="Page navigation" className="d-flex justify-content-center">
              <ul className="pagination">
                {[...Array(totalPages)].map((_, index) => (
                  <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      )}
    </div>
  );
};

export default Form;
