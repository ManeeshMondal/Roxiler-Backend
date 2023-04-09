const { default: axios } = require("axios");
const Product = require("../models/productModel");


//1st api fetch product 
exports.fetchProduct = async (req, res) => {
  try{

  const s3response = await axios.get("https://s3.amazonaws.com/roxiler.com/product_transaction.json")

  console.log( s3response.data)
  const product = await Product.insertMany(s3response.data);
  res.status(201).json({success:true, response:s3response.data})
}
catch(err){
  throw err 
 
}
};

const monthNumberMap={
  "January":'01',
  "February":'02',
  "March":'03',
  "April":'04',
  "May":'05',
  "June":'06',
  "July":'07',
  "August":'08',
  "September":'09',
  "October":'10',
  "November":'11',
  "December":'12',
}

// 2nd api 
exports.fetchStats = async (req, res) => {
  try{
    
    const month = req.body.month

    const monthNumber = monthNumberMap[month]

    // console.log({monthNumber})

    const soldProducts = await Product.find({sold:true, dateOfSale: {
        $regex: `^.*-${monthNumber}-.*$`
      }
    });

    const unsoldProducts = await Product.find({sold:false, dateOfSale: {
      $regex: `^.*-${monthNumber}-.*$`
    }
  });

    let totalPrice =0;

    soldProducts.forEach((i)=>totalPrice+=i.price)

  res.status(201).json({success:true, totalPrice, soldProducts:soldProducts.length, unsoldProducts: unsoldProducts.length})
}
catch(err){
  throw err 
 
}
};


// 3rd api  
exports.barChart = async (req, res) => {
  try{
    
    const month = req.body.month

    const monthNumber = monthNumberMap[month]

    // console.log({monthNumber})

    const soldProducts = await Product.find({sold:true, dateOfSale: {
        $regex: `^.*-${monthNumber}-.*$`
      }
    });
    const priceRangeCount=[0,0,0,0,0,0,0,0,0,0]
    soldProducts.forEach((i)=>{
    const  price  = i.price;
    if (price >= 0 && price <= 100) {
      priceRangeCount[0]++;
    } else if (price >= 101 && price <= 200) {
      priceRangeCount[1]++;
    } else if (price >= 201 && price <= 300) {
      priceRangeCount[2]++;
    } else if (price >= 301 && price <= 400) {
      priceRangeCount[3]++;
    } else if (price >= 401 && price <= 500) {
      priceRangeCount[4]++;
    } else if (price >= 501 && price <= 600) {
      priceRangeCount[5]++;
    } else if (price >= 601 && price <= 700) {
      priceRangeCount[6]++;
    } else if (price >= 701 && price <= 800) {
      priceRangeCount[7]++;
    } else if (price >= 801 && price <= 900) {
      priceRangeCount[8]++;
    } else if (price >= 901) {
      priceRangeCount[9]++;
    }
  }
  )
  
  const response = [
    { priceRange: '0-100', count: priceRangeCount[0] },
    { priceRange: '101-200', count: priceRangeCount[1] },
    { priceRange: '201-300', count: priceRangeCount[2] },
    { priceRange: '301-400', count: priceRangeCount[3] },
    { priceRange: '401-500', count: priceRangeCount[4] },
    { priceRange: '501-600', count: priceRangeCount[5] },
    { priceRange: '601-700', count: priceRangeCount[6] },
    { priceRange: '701-800', count: priceRangeCount[7] },
    { priceRange: '801-900', count: priceRangeCount[8] },
    { priceRange: '901-above', count: priceRangeCount[9] },
  ];
  
  res.status(201).json({success:true, response})
}
catch(err){
  throw err 
 
}
};

// 4th api 
exports.piChart = async (req, res) => {
  try{
    
    const month = req.body.month

    const monthNumber = monthNumberMap[month]

    const soldProducts = await Product.find({sold:true, dateOfSale: {
        $regex: `^.*-${monthNumber}-.*$`
      }
    });

    // Create an object with unique categories and its item count for the selected month
    const categories = {};
    soldProducts.forEach((item)=>{
      if (!categories[item.category]) {
        categories[item.category] = 1;
      } else {
        categories[item.category]++;
      }
  }
  )
  
  // Convert unique categories object to array of objects to generate pie chart
  const pieChartData = Object.keys(categories).map(category => {
    return {
      category: category,
      count: categories[category]
    };
  });

  
  res.status(201).json({success:true, pieChartData })
}
catch(err){
  throw err 
 
}
};


// 5th api 
 exports.allapi = async (req, res) => {
  try{
    
    const month = req.body.month

    const monthNumber = monthNumberMap[month]

    const soldProducts = await Product.find({sold:true, dateOfSale: {
        $regex: `^.*-${monthNumber}-.*$`
      }
    });

    const unsoldProducts = await Product.find({sold:false, dateOfSale: {
      $regex: `^.*-${monthNumber}-.*$`
    }
  });

    let totalPrice =0;

    soldProducts.forEach((i)=>totalPrice+=i.price)
     
      const priceRangeCount=[0,0,0,0,0,0,0,0,0,0]
      soldProducts.forEach((i)=>{
      const  price  = i.price;
      if (price >= 0 && price <= 100) {
        priceRangeCount[0]++;
      } else if (price >= 101 && price <= 200) {
        priceRangeCount[1]++;
      } else if (price >= 201 && price <= 300) {
        priceRangeCount[2]++;
      } else if (price >= 301 && price <= 400) {
        priceRangeCount[3]++;
      } else if (price >= 401 && price <= 500) {
        priceRangeCount[4]++;
      } else if (price >= 501 && price <= 600) {
        priceRangeCount[5]++;
      } else if (price >= 601 && price <= 700) {
        priceRangeCount[6]++;
      } else if (price >= 701 && price <= 800) {
        priceRangeCount[7]++;
      } else if (price >= 801 && price <= 900) {
        priceRangeCount[8]++;
      } else if (price >= 901) {
        priceRangeCount[9]++;
      }
    }
    )
    
    const response = [
      { priceRange: '0-100', count: priceRangeCount[0] },
      { priceRange: '101-200', count: priceRangeCount[1] },
      { priceRange: '201-300', count: priceRangeCount[2] },
      { priceRange: '301-400', count: priceRangeCount[3] },
      { priceRange: '401-500', count: priceRangeCount[4] },
      { priceRange: '501-600', count: priceRangeCount[5] },
      { priceRange: '601-700', count: priceRangeCount[6] },
      { priceRange: '701-800', count: priceRangeCount[7] },
      { priceRange: '801-900', count: priceRangeCount[8] },
      { priceRange: '901-above', count: priceRangeCount[9] },
    ];
    
    const categories = {};
    soldProducts.forEach((item)=>{
      if (!categories[item.category]) {
        categories[item.category] = 1;
      } else {
        categories[item.category]++;
      }
  }
  )
  
  // Convert unique categories object to array of objects to generate pie chart
  const pieChartData = Object.keys(categories).map(category => {
    return {
      category: category,
      count: categories[category]
    };
  });

  res.status(201).json({success:true, totalPrice, soldProducts:soldProducts.length, unsoldProducts: unsoldProducts.length,response,pieChartData})
}
catch(err){
  throw err 
 
}
};



