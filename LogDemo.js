// run this command in to install log4js  =>  npm install log4js
var http=require('http');
http.createServer(function(req,res)
{
    res.writeHead(200,{'content-type':'text/plain'});
    res.end('Attempting to create day wise folder for logging ...');
    }).listen(9001);
// Assigning  current date as folder name log files
var dt = new Date();
var logFolder=`c:/Logging/${dt.getDate()}_${dt.getMonth()+1}_${dt.getFullYear()}`;
var logFileName;
var loggerMessage;
var loggerLevel; // info or error or warn
try 
{
  var ProductRate=100;
  var DiscountPercentage=20;
  if (DiscountPercentage>40) //Warning
  {
    loggerLevel='warn'; //lets assume, this is technically correct but business logic wise, not valid
    loggerMessage='Discount percentage must not be higher than 40'
    logFileName=`${logFolder}/Warning/Discount_WarningLog.log`
  }
  else // success case
  {
    var MRP=ProductRate*(DiscountPercentage/100);
    loggerLevel='info' 
    loggerMessage='MRP has been successfully calculated as ' + MRP;
    logFileName=`${logFolder}/Success/MRP_SuccessLog.log`
  }
  
}
 catch (e) // error case
  {
      
    loggerLevel='error'
    logFileName=`${logFolder}/SystemError/${e.name}.log`  //naming error name as log file name
    loggerMessage=e.message;
  }
//Assign logFileName and configure other setting of log file here
    const log4js=require('log4js');
    log4js.configure(
        {
        appenders: { LogDemo: { type: 'file', filename: logFileName } },
        categories: { default: { appenders: ['LogDemo'], level: loggerLevel} } //info or warn or error
        });

    const logger = log4js.getLogger('LogDemo');
    //logger.trace(loggerMessage);
    //logger.debug(loggerMessage);
    logger.info(loggerMessage);
    logger.warn(loggerMessage);
    logger.error(loggerMessage);
    //logger.fatal(loggerMessage);

    console.log(`Log file has been created in ${logFileName} `);