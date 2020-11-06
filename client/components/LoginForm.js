import React from "react";

const LocalLoginForm = (props) => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex column">
        <div className="flex column m1">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={props.state.email}
            onChange={props.handleChange}
          />
        </div>
        <div className="flex column m1">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={props.state.password}
            onChange={props.handleChange}
          />
        </div>
        <div className="m1">
          <button type="submit" className="btn bg-blue white p1 rounded">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default LocalLoginForm;
