import Loader from "react-loader-spinner";

export default function LoadingView() {
    return (
        <div style={{
            color: "#dbecec", marginTop: "60px",
            padding: "80px 105px"
        }}>
            <div style={{ textAlign: "center" }}>
                {/* <h2 style={{ color: "rgb(72, 74, 100)" }}>Hold on a minute, please.</h2> */}
                <Loader
                    type="Oval"
                    color="rgb(72, 74, 100)"
                    height={150}
                    width={150}
                    style={{ margin: "50px" }}
                />
            </div>
        </div>
    );
}