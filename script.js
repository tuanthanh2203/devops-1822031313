const runButton = document.querySelector("#run-pipeline");
const pipelineMessage = document.querySelector("#pipeline-message");
const steps = [...document.querySelectorAll(".pipeline-step")];
const connectors = [...document.querySelectorAll(".connector")];

const wait = (duration) => new Promise((resolve) => setTimeout(resolve, duration));

function resetPipeline() {
  steps.forEach((step, index) => {
    step.classList.remove("is-running", "is-done");
    step.querySelector(".step-status").textContent = index === 0 ? "READY" : "WAITING";
  });
  connectors.forEach((connector) => connector.classList.remove("is-active"));
}

async function runPipeline() {
  runButton.disabled = true;
  resetPipeline();

  const messages = [
    "Đang push code lên nhánh main...",
    "Đang kiểm tra cấu trúc HTML và thẻ title...",
    "Đang triển khai artifact lên GitHub Pages...",
  ];

  for (let index = 0; index < steps.length; index += 1) {
    const step = steps[index];
    step.classList.add("is-running");
    step.querySelector(".step-status").textContent = "RUNNING";
    pipelineMessage.textContent = messages[index];
    await wait(850);

    step.classList.remove("is-running");
    step.classList.add("is-done");
    step.querySelector(".step-status").textContent = "PASSED ✓";

    if (connectors[index]) {
      connectors[index].classList.add("is-active");
      await wait(350);
    }
  }

  pipelineMessage.textContent = "Hoàn tất — website đã được triển khai thành công!";
  runButton.disabled = false;
  runButton.innerHTML = '<span class="run-icon" aria-hidden="true">↻</span> Chạy lại pipeline';
}

runButton.addEventListener("click", runPipeline);
document.querySelector("#year").textContent = new Date().getFullYear();
