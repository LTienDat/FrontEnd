
const shareMethods = {
	formatPrice : (pri)=>{
        const price =  pri.toLocaleString('de-DE', {
          style: 'currency',
          currency: 'VND',
          maximumFractionDigits: 0
        });
        return price
    },

}
export default shareMethods