const validatePhone = (num) => {
    return num.match(/\d/g).length === 11;
  };
  
  const validateEmail = (email) => {
    const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  
    if (email.match(emailFormat)) {
      return true;
    }
  };
  
  const validateForm = (req, res) => {
    const { name, address, city, country } = req.body;
    const { position, phone, email } = req.body.contact;
  
    if (!name) {
      res.status(400).json({
        error: "Warehouse Name Required",
      });
    }
    if (!address) {
      res.status(400).json({
        error: "Address Required",
      });
    }
    if (!city) {
      res.status(400).json({
        error: "City Required",
      });
    }
    if (!country) {
      res.status(400).json({
        error: "Country Required",
      });
    }
    if (!req.body.contact.name) {
      res.status(400).json({
        error: "Contact Name Required",
      });
    }
    if (!position) {
      res.status(400).json({
        error: "Position Required",
      });
    }
    if (!phone) {
      res.status(400).json({
        error: "Phone Number required",
      });
    }
    if (!validatePhone(phone)) {
      res.status(400).json({
        error: "Invalid Phone Number",
      });
    }
    if (!email) {
      res.status(400).json({
        error: "Email Missing",
      });
    }
    if (!validateEmail(email)) {
      res.status(400).json({
        error: "Invalid Email",
      });
    } else {
      return true;
    }
  };
  
  const validateItem = (req, res) => {
    const item = req.body;
    let valid = true;
    let emptyFields = [];
    Object.entries(item).forEach(([key, value]) => {
      if (!value && value !== 0) {
        valid = false;
        emptyFields.push(key);
      }
    });
    if (valid) {
      return valid;
    } else {
      emptyFields = emptyFields.join(", ");
      res.status(400).json({
        error: `Please fill out the following fields: ${emptyFields}`,
      });
    }
  };
  
  exports.validateForm = validateForm;
  exports.validateItem = validateItem;
  