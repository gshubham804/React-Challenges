/* eslint-disable react/prop-types */
import { useState } from "react";

const TotalCapacity = 1000;

const TankCard = ({ tankIndex, currentWaterLevel, fillTank, emptyTank }) => {
  const tankHeight = 200; // Adjust the height of the tank as needed
  const tankWidth = 120; // Adjust the width of the tank as needed

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginRight: "2rem",
          alignItems: "center",
        }}
      >
        <p
          style={{
            margin: 0,
            //   transform: "translate(-50%, -50%)",
            color: "#333",
            fontSize: "14px",
            fontWeight: "bold",
          }}
        >
          Tank {tankIndex + 1}
        </p>
        <div
          style={{
            position: "relative",
            width: `${tankWidth}px`,
            height: `${tankHeight}px`,
            backgroundColor: "#f0f0f0", // Tank color
            border: "1px solid #ccc",
            borderRadius: "8px", // Adjust border radius for rounded corners
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: `${(currentWaterLevel / TotalCapacity) * tankHeight}px`,
              backgroundColor: "#00FFFF",
              borderRadius: "0 0 8px 8px", // Match the tank's border radius
            }}
          ></div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <button
            onClick={() => fillTank(tankIndex)}
            style={{
              padding: "8px 12px",
              fontSize: "12px",
              background: "#3498db",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginBottom: "12px",
            }}
          >
            Fill Tank
          </button>
          <button
            onClick={() => emptyTank(tankIndex)}
            style={{
              padding: "8px 12px",
              fontSize: "12px",
              background: "#e74c3c",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Empty Tank
          </button>
        </div>
      </div>
    </>
  );
};

const WaterLevel = () => {
  const [tanks, setTanks] = useState(
    Array.from({ length: 4 }, () => ({ currentWaterLevel: 0 }))
  );

  const updateTank = (tankIndex, updatedTank) => {
    setTanks((prevTanks) => [
      ...prevTanks.slice(0, tankIndex),
      updatedTank,
      ...prevTanks.slice(tankIndex + 1),
    ]);
  };

  const fillTank = (tankIndex) => {
    updateTank(tankIndex, {
      ...tanks[tankIndex],
      currentWaterLevel: Math.min(
        tanks[tankIndex].currentWaterLevel + 200,
        TotalCapacity
      ),
    });
  };

  const emptyTank = (tankIndex) => {
    updateTank(tankIndex, { ...tanks[tankIndex], currentWaterLevel: 0 });
    setTimeout(() => {
      randomizeWaterLevel();
    }, 1000);
  };

  const randomizeWaterLevel = () => {
    const random =
      Math.floor(Math.random() * (TotalCapacity / 200 - 1)) * 200 + 200;

    for (let i = 0; i < tanks.length; i++) {
      updateTank(i, { ...tanks[i], currentWaterLevel: random });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {tanks.map((tank, index) => (
        <TankCard
          key={index}
          tankIndex={index}
          currentWaterLevel={tank.currentWaterLevel}
          fillTank={fillTank}
          emptyTank={emptyTank}
        />
      ))}
    </div>
  );
};

export default WaterLevel;
