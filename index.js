document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#mainform").addEventListener("submit", (e) => {
    e.preventDefault();
    function beefcalculation() {
      /*-----------Beef-------------*/
      const bopening = document.querySelector("#bopeningStock").value;
      const bclosing = document.querySelector("#bclosingStock").value;
      const bbuy = document.querySelector("#bprice").value;
      const bselling = document.querySelector("#bsprice").value;
      const bwaste = document.querySelector("#bwaste").value;
      const bdebt = document.querySelector("#bamount").value;
      const bactualsale = document.querySelector("#bsales").value;
      const bcomment = document.querySelector("#bcomments").value;

      const bsaleskg = bopening - bclosing - bwaste;
      const bsalescash = bsaleskg * bselling - bdebt;
      const bexcess = bactualsale - bsalescash;
      //console.log(bexcess);

      document.querySelector("#bexpected").textContent = bsalescash;
      document.querySelector("#bactual").textContent = bactualsale;
      document.querySelector("#bexcess").textContent = bexcess;

      /*-----------Pork--------------*/
      const popening = document.querySelector("#popeningStock").value;
      const pclosing = document.querySelector("#pclosingStock").value;
      const pbuy = document.querySelector("#pprice").value;
      const pselling = document.querySelector("#pprice").value;
      const pwaste = document.querySelector("#pwaste").value;
      const pdebt = document.querySelector("#pamount").value;
      const pactualsale = document.querySelector("#psales").value;
      const pcomment = document.querySelector("#pcomments").value;

      const psaleskg = popening - pclosing - pwaste;
      const psalescash = psaleskg * pselling - pdebt;
      const pexcess = pactualsale - psalescash;
      //console.log(pexcess);

      document.querySelector("#pexpected").textContent = psalescash;
      document.querySelector("#pactual").textContent = pactualsale;
      document.querySelector("#pexcess").textContent = pexcess;

      /*-----------------------chicken---------------*/
      const copening = document.querySelector("#copeningStock").value;
      const cclosing = document.querySelector("#cclosingStock").value;
      const cbuy = document.querySelector("#cprice").value;
      const cselling = document.querySelector("#cprice").value;
      const cwaste = document.querySelector("#cwaste").value;
      const cdebt = document.querySelector("#camount").value;
      const cactualsale = document.querySelector("#csales").value;
      const ccomment = document.querySelector("#ccomments").value;

      const csaleskg = copening - cclosing - cwaste;
      const csalescash = csaleskg * cselling - cdebt;
      const cexcess = cactualsale - csalescash;

      //console.log(cexcess);
      document.querySelector("#cexpected").textContent = csalescash;
      document.querySelector("#cactual").textContent = cactualsale;
      document.querySelector("#cexcess").textContent = cexcess;

      /*-------------------mutton----------------*/
      const mopening = document.querySelector("#mopeningStock").value;
      const mclosing = document.querySelector("#mclosingStock").value;
      const mbuy = document.querySelector("#mprice").value;
      const mselling = document.querySelector("#mprice").value;
      const mwaste = document.querySelector("#mwaste").value;
      const mdebt = document.querySelector("#mamount").value;
      const mactualsale = document.querySelector("#msales").value;
      const mcomment = document.querySelector("#mcomments").value;

      const msaleskg = mopening - mclosing - mwaste;
      const msalescash = msaleskg * mselling - mdebt;
      const mexcess = mactualsale - msalescash;
      //console.log(new Date().toISOString());

      document.querySelector("#mexpected").textContent = msalescash;
      document.querySelector("#mactual").textContent = mactualsale;
      document.querySelector("#mexcess").textContent = mexcess;

      function getCurrentFormattedDate() {
        const months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];

        const now = new Date();

        const day = now.getDate();
        const month = months[now.getMonth()];
        const year = now.getFullYear();

        return `${day}/${month}/${year}`;
      }
      const formattedDate = getCurrentFormattedDate();

      document.querySelector("#day").value = formattedDate;
      console.log(document.querySelector("#day").value);

      data = {
        id: "",
        date: document.querySelector("#day").value.toLowerCase(),
        beef: {
          openingstock: bopening,
          closingstock: bclosing,
          sellingprice: bselling,
          buyingprice: bbuy,
          waste: bwaste,
          debts: bdebt,
          sales: bactualsale,
          comments: bcomment,
          expectedsales: bsalescash,
          less: 0,
          excess: bexcess,
          actualprofit: 0,
          expectedprofit: 0,
        },
        pork: {
          openingstock: popening,
          closingstock: pclosing,
          sellingprice: pselling,
          buyingprice: pbuy,
          waste: pwaste,
          debts: pdebt,
          sales: pactualsale,
          comments: pcomment,
          expectedsales: psalescash,
          less: 0,
          excess: pexcess,
          actualprofit: 0,
          expectedprofit: 0,
        },
        chicken: {
          openingstock: copening,
          closingstock: cclosing,
          sellingprice: cselling,
          buyingprice: cbuy,
          waste: cwaste,
          debts: cdebt,
          sales: cactualsale,
          comments: ccomment,
          expectedsales: csalescash,
          less: 0,
          excess: cexcess,
          actualprofit: 0,
          expectedprofit: 0,
        },
        mutton: {
          openingstock: copening,
          closingstock: cclosing,
          sellingprice: cselling,
          buyingprice: cbuy,
          waste: cwaste,
          debts: cdebt,
          sales: cactualsale,
          comments: ccomment,
          expectedsales: csalescash,
          less: 0,
          excess: cexcess,
          actualprofit: 0,
          expectedprofit: 0,
        },
      };
      fetch("http://localhost:8080/data")
        .then((res) => res.json())
        .then((detail) => {
          const date = detail.find((element) => {
            if (
              element.date == document.querySelector("#day").value.toLowerCase()
            ) {
              return true;
            } else {
              return false;
            }
          });
          if (!date) {
            fetch("http://localhost:8080/data", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            })
              .then((res) => res.json())
              .then((data) => {});
          } else {
            alert("Date exists");
          }
        });
    }
    beefcalculation();
  });
  function getData() {
    fetch("http://localhost:8080/data")
      .then((res) => res.json())
      .then((detail) => {
        const specific = detail.find((element) => {
          const inputDate = document.querySelector("#date").value;
          console.log(inputDate.toLowerCase());
          if (element.date == inputDate.toLowerCase()) {
            return true;
          } else {
            return false;
          }
        });
        console.log(specific.id);
        document.querySelector("#result").innerHTML = `
        <div id='innerresult'>
           <div id='rbeef'>
             <h4>BEEF</h4>
              <p>Expected sales: ${specific.beef.expectedsales}</p>
              <p>Actual sales: ${specific.beef.sales}</p>
              <p>excess of: ${specific.beef.excess}</p>
              <p></p>
            </div>
            <div id='rpork'>
            <h4>PORK</h4>
              <p>Expected sales: ${specific.pork.expectedsales}</p>
              <p>Actual sales: ${specific.pork.sales}</p>
              <p>excess of: ${specific.pork.excess}</p>
              <p></p>
            </div>
            <div id='rchicken'>
            <h4>CHICKEN</h4>
              <p>Expected sales: ${specific.chicken.expectedsales}</p>
              <p>Actual sales: ${specific.chicken.sales}</p>
              <p>excess of: ${specific.chicken.excess}</p>
              <p></p>
            </div>
            <div id='rmutton'>
            <h4>MUTTON</h4>
              <p>Expected sales: ${specific.mutton.expectedsales}</p>
              <p>Actual sales: ${specific.mutton.sales}</p>
              <p>excess of: ${specific.mutton.excess}</p>
              <p></p>
            </div>

        </div>
             `;
        document.querySelector("#delete").textContent = "DELETE";
        document.querySelector("#delete").addEventListener("click", () => {
          deletedata(specific.id);
        });
      });
  }
  document.querySelector("#search").addEventListener("click", () => getData());

  function deletedata(id) {
    fetch(`http://localhost:8080/data/${id}`, {
      method: "DELETE",
      headers: {},
    })
      .then((response) => {
        if (response.ok) {
          console.log("Object deleted successfully");
          document.querySelector("#innerresult").remove();
        } else {
          console.error("Failed to delete object");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
});
