const User = require("../Model/UserModel");

// Get all users
const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    console.log(err);
  }

  if(!users){
    return res.status(404).json({message: "No users found"});
  }

  //display all users
  return res.status(200).json({users});
};



// Add user
const addUsers = async (req, res, next) => {
  const {fullName,
      nic,
      dob,
      gender,
      maritalStatus,
      address,
      gnDivision,
      contactNumber,
      householdIncome,
      occupation,
      dependents,
      headOfHousehold,
      programType,
      reason,
      requestedAmount,
      previousAidReceived,
      previousAidDetails,
      appliedDate} = req.body;

      let users;
      try{
        users = new User({
          fullName,
      nic,
      dob,
      gender,
      maritalStatus,
      address,
      gnDivision,
      contactNumber,
      householdIncome,
      occupation,
      dependents,
      headOfHousehold,
      programType,
      reason,
      requestedAmount,
      previousAidReceived,
      previousAidDetails,
      appliedDate
      });
      await users.save();
      }catch(err){
        console.log(err);
      } 

      //not insert users
      if(!users){
        return res.status(404).json({message: "Unable to add user"});
      }
      return res.status(200).json({users});
}

// Get user by ID
const getById = async (req, res, next) => {
  const id = req.params.id;
  let user;
  try{
    user = await User.findById(id);
  }catch(err){
    console.log(err);
  }
  //notavailable users
      if(!user){
        return res.status(404).json({message: "User not found"});
      }
      return res.status(200).json({user});

};


// Update user
const updateUser = async (req, res, next) => {
  const id = req.params.id;
  const {fullName,
      nic,
      dob,
      gender,
      maritalStatus,
      address,
      gnDivision,
      contactNumber,
      householdIncome,
      occupation,
      dependents,
      headOfHousehold,
      programType,
      reason,
      requestedAmount,
      previousAidReceived,
      previousAidDetails,
      appliedDate} = req.body;

      let users;
      try{
        users = await User.findByIdAndUpdate(id, {
          fullName:fullName,
          nic:nic,
          dob:dob,
          gender,
          maritalStatus:maritalStatus,
          address:address,
          gnDivision:gnDivision,
          contactNumber:contactNumber,
          householdIncome:householdIncome,
          occupation:occupation,
          dependents:dependents,
          headOfHousehold:headOfHousehold,
          programType:programType,
          reason:reason,
          requestedAmount:requestedAmount,
          previousAidReceived:previousAidReceived,
          previousAidDetails:previousAidDetails,
          appliedDate:appliedDate});

          users = await users.save();
      }catch(err){
        console.log(err);
      }
      //can not update users
      if(!users){
        return res.status(404).json({message: "Unable to update user"});
      }
      return res.status(200).json({users});



    
};





// Delete user
const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  let user;
  try{
    user = await User.findByIdAndDelete(id);
  }catch(err){
    console.log(err);
  }

  //can not delete users
      if(!user){
        return res.status(404).json({message: "Unable to delete user"});
      }
      return res.status(200).json({user});
};

// Export controllers
exports.getAllUsers = getAllUsers;
exports.addUsers = addUsers;
exports.getById = getById;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;