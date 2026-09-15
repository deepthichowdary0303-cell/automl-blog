document.addEventListener("DOMContentLoaded", () => {
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => document.querySelectorAll(s);

  const pipelineContent = {
    discovery: ["Discovery","Translate the business request into an explicit specification: target, entity, scoring timestamp, latency, review budget and optimisation objective."],
    temporal: ["Temporal Data","Build point-in-time-safe datasets so every feature represents information that genuinely existed when the transaction was scored."],
    features: ["Feature Gates","Reject unavailable, leaked, unstable or redundant signals before expensive model search begins."],
    search: ["CASH + TPE","Jointly search model families, feature subsets and hyperparameters while using previous trials to guide subsequent experiments."],
    evaluation: ["Evaluation","Evaluate chronologically and optimise the metric that reflects operational capacity, such as Catch@1%."]
  };

  $$(".pipeline-stage").forEach(btn => {
    btn.addEventListener("click", () => {
      $$(".pipeline-stage").forEach(x => x.classList.remove("active"));
      btn.classList.add("active");
      const d = pipelineContent[btn.dataset.stage];
      $("#pipeline-description").innerHTML = `<strong>${d[0]}</strong><p>${d[1]}</p>`;
    });
  });

  const featureContent = {
    availability:["Availability","Can the feature actually be computed when the fraud decision is made?"],
    leakage:["Leakage","Does the feature contain future information or information directly derived from the target?"],
    stability:["Stability","Does the feature maintain a reliable relationship with the target across different time periods?"],
    redundancy:["Redundancy","Are multiple features carrying essentially the same signal? Removing redundancy can reduce search complexity."],
    importance:["Model-based Importance","Only after surviving the previous gates should a feature compete on predictive contribution."]
  };

  $$(".feature-gate").forEach(btn => {
    btn.addEventListener("click", () => {
      $$(".feature-gate").forEach(x => x.classList.remove("active"));
      btn.classList.add("active");
      const d = featureContent[btn.dataset.feature];
      $("#feature-description").innerHTML = `<strong>${d[0]}</strong><p>${d[1]}</p>`;
    });
  });

  const metricContent = {
    auc:["ROC-AUC","ROC-AUC evaluates ranking quality across thresholds. It is useful for general discrimination, but it does not directly encode a fixed investigation capacity."],
    catch:["Catch@1%","Catch@1% asks how much fraud appears inside the highest-risk 1% of transactions. This directly reflects a constrained review queue."],
    business:["Business View","Business-aligned evaluation starts from the operational constraint. If investigators can review only 1%, the top 1% of the ranking becomes the critical region to optimise."]
  };

  $$(".metric-tab").forEach(btn => {
    btn.addEventListener("click", () => {
      $$(".metric-tab").forEach(x => x.classList.remove("active"));
      btn.classList.add("active");
      const d = metricContent[btn.dataset.metric];
      $("#metric-description").innerHTML = `<h3>${d[0]}</h3><p>${d[1]}</p>`;
    });
  });

  let nextChosen = false;
  $("#choose-trial").addEventListener("click", () => {
    nextChosen = !nextChosen;
    const point = $("#next-point");
    point.style.display = "block";
    if (nextChosen) {
      point.style.left = "69%";
      point.style.bottom = "76%";
      $("#chart-caption").textContent =
        "TPE uses the history of previous trials to favour this promising region. The next configuration would be evaluated and then added back to the history.";
    } else {
      point.style.left = "53%";
      point.style.bottom = "61%";
      $("#chart-caption").textContent =
        "The next trial explores a nearby region rather than simply repeating the current best configuration.";
    }
  });

  $("#reset-search").addEventListener("click", () => {
    nextChosen = false;
    $("#next-point").style.display = "none";
    $("#chart-caption").textContent =
      "Previous good trials suggest a promising region. Click “Choose next trial” to see the search move toward it.";
  });
});
