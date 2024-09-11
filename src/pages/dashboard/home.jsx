import React, { useContext, useEffect } from "react";
import { Typography } from "@material-tailwind/react";
import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";
import { statisticsCardsData, statisticsChartsData } from "@/data";
import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/solid";
import { useGetUsersHook } from "@/hooks/useGetUsersHook";
import { useGetConciergeHook } from "@/hooks/useGetConciergeHook";
import { useGetOperatorHook } from "@/hooks/useGetOperatorHook";
import { useGetPeerAmbassadorHook } from "@/hooks/useGetPeerAmbassadorHook";
import { useServicePartnerHook } from "@/hooks/useServicePartners";
import { AuthContext } from "../auth/authecontext";

export function Home() {
  const { auth, role } = useContext(AuthContext);
  console.log(role, "role");

  const users = useGetUsersHook();
  const concierge = useGetConciergeHook();
  const operators = useGetOperatorHook();
  const peers = useGetPeerAmbassadorHook();
  const partnersCount = useServicePartnerHook();
  console.log(concierge.getConcierge);
  useEffect(() => {
    if (role === "SUPERADMIN") {
      users.handleGetUsers();
      concierge.handleGetConcierge();
      operators.handleGetOperator();
      peers.handleGetPeerAmbassador();
      partnersCount.handleGetServicePartner();
    } else if (role === "HR") {
      partnersCount.handleGetServicePartner();
      peers.handleGetPeerAmbassador();
      concierge.handleGetConcierge();
    }else {
      operators.handleGetOperator();

    }
  }, [role]);

  const filteredCardsData = statisticsCardsData.filter((card) =>
    card.roles ? card.roles.includes(role) : true
  );
  const filteredChartsData = statisticsChartsData.filter((chart) =>
    chart.roles ? chart.roles.includes(role) : true
  );

  let countsArray = [];
  let titlesArray = [];

  if (role === "SUPERADMIN") {
    countsArray = [
      "4", // Placeholder, adjust if necessary
      concierge?.getConcierge?.length,
      operators?.getOperators?.length,
      peers?.getPeerAmbassador?.length,
      partnersCount.getServicePartner?.length,
    ];
    titlesArray = [
      "Total Operators",
      "Total Concierge",
      "Total Peer Ambassadors",
      "Total Service Partners",
    ];
  } else if (role === "HR") {
    countsArray = [
      concierge?.getConcierge?.length,
      peers?.getPeerAmbassador?.length,
      partnersCount.getServicePartner?.length,
    ];
    titlesArray = [
      "Total Concierge",
      "Total Peer Ambassadors",
      "Total Service Partners",
    ];
  }else if (role === "OPERATIONS") {
    countsArray = [
      operators?.getOperators?.length,
    ];
    titlesArray = [
      "Total Operatos",
    ];
  }
 
  return (
    <div className="mt-12">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        {filteredCardsData.map(({ icon, title, footer, ...rest }, index) => (
          <StatisticsCard
            key={title}
            {...rest}
            // value={"5"}
            // title={title}
            value={countsArray[index]}
            title={titlesArray[index]} // Use titlesArray based on the role
            icon={React.createElement(icon, {
              className: "w-6 h-6 text-white",
            })}
            footer={
              <Typography className="font-normal text-white">
                <strong className={footer.color}>{footer.value}</strong>
                &nbsp;{footer.label}
              </Typography>
            }
          />
        ))}
      </div>
      <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredChartsData.map((props) => (
          <StatisticsChart
            key={props.title}
            {...props}
            footer={
              <Typography
                variant="small"
                className="flex items-center font-normal text-white"
              >
                <ClockIcon strokeWidth={2} className="h-4 w-4 text-white" />
                &nbsp;{props.footer}
              </Typography>
            }
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
