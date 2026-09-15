document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       PIPELINE INTERACTION
    ===================================================== */

    const pipelineStages =
        document.querySelectorAll(".pipeline-stage");

    const pipelineDescription =
        document.getElementById("pipeline-description");


    const pipelineContent = {

        discovery: {

            title: "Discovery",

            text:
                "Translate the business request into an explicit specification: target, entity, scoring timestamp, latency, review budget and optimisation objective."

        },

        temporal: {

            title: "Temporal Data",

            text:
                "Build point-in-time-safe datasets so every feature represents information that genuinely existed when the transaction was scored."

        },

        features: {

            title: "Feature Gates",

            text:
                "Reject unavailable, leaked, unstable or redundant signals before expensive model search begins."

        },

        search: {

            title: "CASH + TPE",

            text:
                "Jointly search model families, feature subsets and hyperparameters while using previous trials to guide subsequent experiments."

        },

        evaluation: {

            title: "Evaluation",

            text:
                "Evaluate chronologically and optimise the metric that reflects operational capacity, such as Catch@1%."

        }

    };


    pipelineStages.forEach(stage => {

        stage.addEventListener("click", () => {

            pipelineStages.forEach(item => {

                item.classList.remove("active");

            });


            stage.classList.add("active");


            const key =
                stage.dataset.stage;

            const content =
                pipelineContent[key];


            pipelineDescription.innerHTML = `

                <strong>${content.title}</strong>

                <p>${content.text}</p>

            `;

        });

    });



    /* =====================================================
       FEATURE GATES
    ===================================================== */

    const featureGates =
        document.querySelectorAll(".feature-gate");

    const featureDescription =
        document.getElementById("feature-description");


    const featureContent = {

        availability: {

            title: "Availability",

            text:
                "Can the feature actually be computed when the fraud decision is made?"

        },

        leakage: {

            title: "Leakage",

            text:
                "Does the feature contain future information or information directly derived from the target?"

        },

        stability: {

            title: "Stability",

            text:
                "Does the feature maintain a reliable relationship with the target across different time periods?"

        },

        redundancy: {

            title: "Redundancy",

            text:
                "Are multiple features carrying essentially the same signal? Removing redundancy can reduce search complexity."

        },

        importance: {

            title: "Model-based Importance",

            text:
                "Only after surviving the previous gates should a feature compete on predictive contribution."

        }

    };


    featureGates.forEach(gate => {

        gate.addEventListener("click", () => {

            featureGates.forEach(item => {

                item.classList.remove("active");

            });


            gate.classList.add("active");


            const key =
                gate.dataset.feature;

            const content =
                featureContent[key];


            featureDescription.innerHTML = `

                <strong>${content.title}</strong>

                <p>${content.text}</p>

            `;

        });

    });



    /* =====================================================
       METRIC TABS
    ===================================================== */

    const metricTabs =
        document.querySelectorAll(".metric-tab");

    const metricDescription =
        document.getElementById("metric-description");


    const metricContent = {

        auc: {

            title: "ROC-AUC",

            text:
                "ROC-AUC evaluates how well the model ranks positive examples above negative examples across thresholds. It is useful for general discrimination, but it does not directly encode a fixed investigation capacity."

        },

        catch: {

            title: "Catch@1%",

            text:
                "Catch@1% asks how much fraud appears inside the highest-risk 1% of transactions. This directly reflects a constrained review queue."

        },

        business: {

            title: "Business View",

            text:
                "Business-aligned evaluation starts from the operational constraint. If investigators can review only 1%, the top 1% of the ranking becomes the critical region to optimise."

        }

    };


    metricTabs.forEach(tab => {

        tab.addEventListener("click", () => {

            metricTabs.forEach(item => {

                item.classList.remove("active");

            });


            tab.classList.add("active");


            const key =
                tab.dataset.metric;

            const content =
                metricContent[key];


            metricDescription.innerHTML = `

                <h3>${content.title}</h3>

                <p>${content.text}</p>

            `;

        });

    });



    /* =====================================================
       TPE SIMULATION
    ===================================================== */

    const runTrial =
        document.getElementById("run-trial");

    const resetTrials =
        document.getElementById("reset-trials");

    const bestScore =
        document.getElementById("best-score");

    const progressBar =
        document.getElementById("progress-bar");

    const trialMessage =
        document.getElementById("trial-message");


    let best =
        0;

    let trials =
        0;


    function renderSimulation() {

        bestScore.textContent =
            `${best}%`;

        progressBar.style.width =
            `${best}%`;

        if (trials === 0) {

            trialMessage.textContent =
                "No trials have been completed.";

        }

        else {

            trialMessage.textContent =
                `Trial ${trials} completed. Best observed objective: ${best}%.`;

        }

    }


    runTrial.addEventListener("click", () => {

        trials++;


        /*
         * This is only a visual simulation.
         *
         * Replace this with actual optimisation results
         * if you have them.
         */

        const candidate =
            Math.round(
                35 + Math.random() * 60
            );


        if (candidate > best) {

            best =
                candidate;

        }


        renderSimulation();

    });


    resetTrials.addEventListener("click", () => {

        best =
            0;

        trials =
            0;

        renderSimulation();

    });


    renderSimulation();

});