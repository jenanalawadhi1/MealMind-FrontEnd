const Plan = ({ plan }) => {
  return (
    <div>
      <h3>{plan.planName}</h3>
      <Link to={`/plans/${plan._id}`}>
        <div className="button">Read More</div>
      </Link>
    </div>
  )
}

export default Plan
