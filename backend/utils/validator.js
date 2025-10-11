const dns = require('dns');

const isvalidIpAddress = (input) => {
    const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
    return ipv4Regex.test(input);
}

const isvalidDomainName = (input) =>{
    const domainRegex = /^(?!-)[A-Za-z0-9-]{1,63}(?<!-)\.(?!-)(?:[A-Za-z0-9-]{1,63}\.)*[A-Za-z]{2,6}$/;
    const cleanedInput = input.replace(/^https?:\/\//, '');
    return domainRegex.test(cleanedInput);

}

const resolveDomainName = (domain) => {
    return new Promise((resolve, reject) => {
        dns.lookup(domain,4, (err, address) => {
            if(err || !address ){
                return reject(new Error (`DNS resolution failed for domain name :${domain}. ensure it is valid and reachable.`));
            }
            resolve(address);
        });


    });
}

module.exports = {isvalidIpAddress,isvalidDomainName,resolveDomainName};