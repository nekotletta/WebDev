// We have a start and end date. We need to validate that the start date is
// earlier than the enddate

// same day counts as valid, time (datetime object) will not be counted
async function checkDatesAreValid(req, res, next) {
    const startDate = req.body.startdate; 
    const endDate = req.body.enddate; 

    // dates can be null
    if(!startDate && !endDate){
        return next();
    } 
    // this is fine, because we can just infer the experience is still ongoing (start date -- present)
    if(startDate && !endDate){
        return next();
    }
    try {

        
        // crete date objects to compare
        // this takes care of the error when the user only inputs one date (either start or end)
        // this is not valid, either both or none
        const start = new Date(startDate);
        const end = new Date(endDate);

        // start date before end date
        if (start > end) {
            return res.status(400).json({ message: "Start date must be before end date." });
        }

        next();
    } catch (err) {
        return res.status(500).json({ message: "Server error.", error: err.message });
    }
}

module.exports = { checkDatesAreValid };