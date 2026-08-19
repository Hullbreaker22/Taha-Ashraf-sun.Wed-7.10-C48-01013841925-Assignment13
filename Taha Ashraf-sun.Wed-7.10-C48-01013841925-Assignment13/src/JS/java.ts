(function () {
    const Swal = (window as any).Swal;
    const OpenModal = document.getElementById('AddBtn');
    const modal = document.querySelector('.Modal');
    const darkLayer = document.querySelector('.dark-layer');
    const EmptyFolder = document.querySelector('.pending-body-ToDO');
    const EmptyComplete = document.querySelector('.pending-body-Complete');
    const EmptyFolderInProgress = document.querySelector('.pending-body-InProgress');
    const CloseBtn = document.querySelector('.close-call');
    const CancelBtn = document.getElementById('CancelBtn');
    const SaveChanges = document.getElementById('SaveChanges');
    const ToDoCounter = document.getElementById('ToDoTaskCounter');
    const InProgressCounter = document.getElementById('InprogressCounter');
    const CompleteCounter = document.getElementById('CompleteCounter');
    const AddTaskbtn = document.getElementById('AddTask');
    const Titleinput = document.getElementById('TaskTitile') as HTMLInputElement;
    const PriortyInput = document.getElementById('PriortyInput') as HTMLInputElement;
    const Dateinput = document.getElementById('Dateinput') as HTMLInputElement;
    const SecondSpinner = document.getElementById('Spinner') as HTMLInputElement;
    const FirstSpinner = document.getElementById('FirstSpinner') as HTMLInputElement;
    const Descriptioninput = document.getElementById('Descriptioninput') as HTMLInputElement;
    const TodoCardContainer = document.getElementById('TodoCardContainer') ;
    const InProgressContainer = document.getElementById('InProgressContainer');
    const CompleteContainer = document.getElementById('CompleteContainer');
    const textarea = document.getElementById('Descriptioninput') as HTMLInputElement;
    const charCount = document.getElementById('charCount') as HTMLElement;
    const TitleAlert = document.getElementById('TitleAlert') 
    const DateAlert = document.getElementById('DateAlert') 
    const DarkMood = document.querySelector('.dark-toggle ') 
    let CratedSuccessfully = document.getElementById('toast-created')
    let UpdatedSuccessfully = document.getElementById('toast-updated')
    let DeletedSuccessfully = document.getElementById('toast-deleted')
    let UniqeIndex : number;
    
    interface Task {
        Title:string;
        Priority:string;
        TaskDate:string;
        Descrption:string;
        CreatedAt:number
        Category:string
    } 
    

    textarea.addEventListener('input', () => {
    charCount.textContent = String(textarea.value.length);
});



let createdTimeoutt : any;
let updatedTimeout : any;
let deletedTimeout : any;



function ShowCreated() {
    if (!CratedSuccessfully) return;

    clearTimeout(createdTimeoutt);

    CratedSuccessfully.classList.remove('hidden', 'opacity-0');
    CratedSuccessfully.classList.add('flex', 'opacity-100');

    createdTimeoutt = setTimeout(() => {
        CratedSuccessfully.classList.remove('opacity-100');
        CratedSuccessfully.classList.add('opacity-0');

        setTimeout(() => {
            CratedSuccessfully.classList.remove('flex');
            CratedSuccessfully.classList.add('hidden');
        }, 300); 
    }, 3000);
}

function ShowUpdated() {

    if (!UpdatedSuccessfully) return;

    clearTimeout(updatedTimeout);

    UpdatedSuccessfully.classList.remove('hidden', 'opacity-0');
    UpdatedSuccessfully.classList.add('flex', 'opacity-100');

    updatedTimeout = setTimeout(() => {
        UpdatedSuccessfully.classList.remove('opacity-100');
        UpdatedSuccessfully.classList.add('opacity-0');

        setTimeout(() => {
            UpdatedSuccessfully.classList.remove('flex');
            UpdatedSuccessfully.classList.add('hidden');
        }, 300);
    }, 3000);
}

function ShowDeleted() {
    if (!DeletedSuccessfully) return;

    clearTimeout(deletedTimeout);

    DeletedSuccessfully.classList.remove('hidden', 'opacity-0');
    DeletedSuccessfully.classList.add('flex', 'opacity-100');

    deletedTimeout = setTimeout(() => {
        DeletedSuccessfully.classList.remove('opacity-100');
        DeletedSuccessfully.classList.add('opacity-0');

        setTimeout(() => {
            DeletedSuccessfully.classList.remove('flex');
            DeletedSuccessfully.classList.add('hidden');
        }, 300);
    }, 3000);
}

(() => {
    if (localStorage.getItem('theme') === 'dark') {
        document.documentElement.classList.add('dark');
    }
})();


DarkMood?.addEventListener('click',function(){
    document.documentElement.classList.toggle('dark')
    if(document.documentElement.classList.contains('dark'))
    {
            localStorage.setItem('theme','dark')
    }else {
            localStorage.setItem('theme','')
    }

})



function getRelativeTime(createdTimestamp:number) {
    const now = Date.now();
    const diffInSeconds = Math.floor((now - createdTimestamp) / 1000);

    const minutes = Math.floor(diffInSeconds / 60);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (minutes < 1) {
        return "Just now";
    } 
    else if (hours < 1) {
        return `${minutes}min ago`;
    } 
    else {
        return remainingMinutes > 0 
            ? `${hours}h ${remainingMinutes}min ago` 
            : `${hours}h ago`;
    }
}

 
    let ToDoArry: Task[] = JSON.parse(
    localStorage.getItem('ToDoList') || '[]'
    );  

    const InProgressArry : Task[] = JSON.parse(
    localStorage.getItem('InProgress') || '[]'
    );  

    const CompletedArry : Task[] = JSON.parse(
    localStorage.getItem('CompletedList') || '[]'
    );  

    function ClearData() {

        Titleinput.value = '';
        PriortyInput.value = 'medium';
        Dateinput.value = '';
        Descriptioninput.value = '';

    }

    function SetCounters() {
    if (ToDoCounter) {
        ToDoCounter.innerHTML = `${ToDoArry.length} tasks`;
    }

    if (InProgressCounter) {
        InProgressCounter.innerHTML = `${InProgressArry.length} tasks`;
    }

    if (CompleteCounter) {
        CompleteCounter.innerHTML = `${CompletedArry.length} tasks`;
    }
}



function ShowSpinner(){
    if(InProgressArry.length != 0 ) {
        SecondSpinner.classList.remove('hidden')
        FirstSpinner.classList.add('hidden')
    }else {
        SecondSpinner.classList.add('hidden')
        FirstSpinner.classList.remove('hidden')
    }
}


function Cardbody(task: Task, x: number) {
    const {Title , Priority ,TaskDate , Descrption , CreatedAt , Category} = task
    

    let RemainingTime = getRelativeTime(task.CreatedAt);
    let isToDO = Category === 'ToDo';
    let isInProgress = Category === 'InProgress'
    let isCompleted = Category === 'Completed'
    let specialDate = new Date(task.TaskDate).toLocaleDateString('en-US', {
        month: 'short', 
        day: 'numeric'   
    });
    let TextColor :string = '#E2E8F0';
    let BackGroundColor : string = '#E2E8F0'
    let UpperPoint : string = '#CAD5E2'
    let lineThorugh :string = '';
   
    console.log(specialDate);
1
    if(task.Category === 'Completed') {
        lineThorugh = 'line-through'
    }

    if(task.Category === 'InProgress'){
        UpperPoint = '#FFB900'
    }
    if(task.Category === 'Completed'){
        UpperPoint = '#3FCC9E'
    }

    if(task.Priority === 'low'){
        TextColor = "#2B7FFF"
        BackGroundColor = "#EFF6FF"
    }else if(task.Priority === 'medium') {
        TextColor = "#FFB900"
        BackGroundColor = "#FFFBEB"
    }else if (task.Priority === 'High Priority'){
        TextColor = "#FB2C36"
        BackGroundColor = "#FEF2F2"
    }



    return `
      <div class="task-Card bg-[#FFFFFF] w-full mt-4.5 p-4 dark:bg-[#0F172A] dark:border-slate-700/50 shadow-[0_0_2px_2px_rgba(0,0,0,0.06)] rounded-[14px] group transition duration-500 hover:shadow-[0_0_2px_3px_rgba(0,0,0,0.10)]">              
            <div class="Card-header flex flex-row justify-between">
                <div class="left-div flex flex-row mt-1.5 ms-0.5">
                    <i class="fa-solid fa-circle mt-1 me-2.5" style="color: ${UpperPoint};font-size: 7px;"></i>
                    <h2 class="text-[#a6aab1] font-myfont font-bold text-[.625rem] ">#${String(x + 1).padStart(3, '0')}</h2>
                </div>
                <div class="right-div flex flex-row">
                    <div class="pin-icon group/edit flex justify-center Update-Elements items-center cursor-pointer bg-transparent px-1.5 py-1.75 rounded-lg me-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible hover:bg-[#EEF2FF] transition-all duration-300" data-index="${x}" data-cat="${task.Category}">
                        <i class="fa-solid fa-pen text-[#969da5] text-[12px] group-hover/edit:text-[#4F46E5] group-hover/edit:scale-110 transition-all duration-200"></i>
                    </div>
                    
                    <div class="pin-icon group/delete DeleteElement flex justify-center items-center cursor-pointer bg-transparent px-1.5 py-1.75 rounded-lg me-0.75 hover:bg-[#FEF2F2] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300" data-index="${x}" data-cat="${task.Category}">
                        <i class="fa-solid fa-trash text-[#919aa7] text-[12px] group-hover/delete:text-[#EF4444] group-hover/delete:rotate-12 transition-all duration-200"></i>
                    </div>
                </div>
            </div>

            <h2 class="font-myfont text-[#69707F] font-semibold text-[1rem] ${lineThorugh} dark:text-slate-400 mt-3.5 ms-0.5" >${Title}</h2>
            <h2 class="font-myfont text-[.875rem] font-normal text-[#7d8186] dark:text-slate-400 mt-1.5 ms-0.5">${Descrption}</h2>

            <div class="flex ">
                <div class="priority-div w-fit flex flex-row mt-4.5 px-2 py-1 rounded-xl " style="Background-Color: ${BackGroundColor}">
                    <i class="fa-solid fa-circle" style="color:${TextColor}; font-size: 6px; margin-right: 6px;margin-top: 4px;"></i>
                    <h2 class="font-myfont text-[10px] font-bold tracking-wide " style="color: ${TextColor}">${Priority.toUpperCase()}</h2>
                </div>
                
                <div class="priority-div ms-2 w-fit ${isCompleted ? '' : 'hidden'} flex flex-row mt-4.5 px-2 py-1 rounded-xl " style="Background-Color: #DBFAEC">
                    <i class="fa-solid fa-circle" style="color:#43B38F; font-size: 6px; margin-right: 6px;margin-top: 4px;"></i>
                    <h2 class="font-myfont text-[10px] font-bold tracking-wide " style="color: #43B38F">Done</h2>
                </div>
            </div>

            <div class="flex flex-row mt-4">
                <div class="flex flex-row me-2.5 ${TaskDate ? '' : 'hidden'}">
                    <i class="fa-regular fa-calendar" style="color: #90A1B9;font-size: 12px;margin-top: 3px;margin-right: 5px;"></i>
                    <h2 class="text-[.75rem] font-myfont font-semibold  text-[#b8bcc2]">${specialDate}</h2>
                </div>
                <div class="flex flex-row">
                    <i class="fa-regular fa-clock" style="color: #90A1B9;font-size: 12px;margin-top: 3px;margin-right: 5px;"></i>
                    <h2 class="text-[.75rem] font-myfont font-semibold text-[#b8bcc2]">${RemainingTime}</h2>
                </div>
            </div>

            <div class="flex flex-row mt-3 pt-2.5 border-t border-[#dde8f7]">
                ${
                   (isToDO || isCompleted)
                   ? `<button class="StartBtn bg-[#FEF3C6] px-3 py-2 flex flex-row rounded-[9px] me-2 transition duration-200 cursor-pointer ease-in-out hover:scale-105 hover:bg-[#FEE685]" data-index="${x}" data-cat="${task.Category}">
                        <i class="fa-solid fa-play" style="color: #BB4D00; font-size: 10px; margin-right: 4px;margin-top: 3px;"></i>
                        <h2 class="text-[#BB4D00] font-myfont font-semibold text-[.6875rem]">Start</h2>
                      </button>` 
                   : ''
                }

                ${
                   (isInProgress || isCompleted)
                   ? `<button class="ToDoBtn bg-[#F1F5F9] px-3 py-2 flex flex-row rounded-[9px] me-2 transition duration-200 cursor-pointer ease-in-out hover:scale-105 hover:bg-[#E2E8F0]" data-index="${x}" data-cat="${task.Category}">
                        <i class="fa-solid fa-rotate-right" style="color: #3B4B61; font-size: 10px; margin-right: 4px;margin-top: 3px;"></i>
                        <h2 class="text-[#3B4B61] font-myfont font-semibold text-[.6875rem]">To Do</h2>
                      </button>` 
                   : ''
                }
                
                ${
                   (!isCompleted)
                   ? `<button class="Complete bg-[#A4F4CF] px-3 py-2 flex flex-row rounded-[9px] transition duration-200 cursor-pointer ease-in-out hover:scale-105 hover:bg-[#A4F4CF]" data-index="${x}" data-cat="${task.Category}">
                        <i class="fa-solid fa-check" style="color: #0fa774; font-size: 10px; margin-right: 4px;margin-top: 3px;"></i>
                        <h2 class="text-[#0a9265] font-myfont font-semibold text-[.6875rem]">Complete</h2>
                      </button>`
                   : ''
                }
            </div>
    </div>
    `;
}
        function Display() {
            let kartoona: string = '';
            if (ToDoArry.length !== 0) {
                ToDoArry.forEach((task, index) => {
                    kartoona += Cardbody(task, index);
                });
                if (TodoCardContainer) TodoCardContainer.innerHTML = kartoona;
                checkForEmpty();
                UpdatedButtons();
                StartAccess();
                DeleteButtons();
                ToCompleteAccess()
                SetCounters()
                ShowSpinner()
            } else {
                if (TodoCardContainer) TodoCardContainer.innerHTML = '';
                ShowEmpty();
            }
        }

        function DisplayInProgress() {
            let kartoona: string = '';
            if (InProgressArry.length !== 0) {
                InProgressArry.forEach((task, index) => {
                    kartoona += Cardbody(task, index); 
                });
                if (InProgressContainer) InProgressContainer.innerHTML = kartoona;
                HideEmptyInProgress();
                UpdatedButtons();
                DeleteButtons();
                ToDOAccess()
                ToCompleteAccess()
                SetCounters()
                ShowSpinner()
            } else {
                if (InProgressContainer) InProgressContainer.innerHTML = '';
                ShowEmptyInProgress();
            }
        }

        function DisplayComplete() {
    let kartoona: string = '';
    

    if (CompletedArry.length !== 0) {
        CompletedArry.forEach((task, index) => {
            kartoona += Cardbody(task, index);
        });

        if (CompleteContainer) {
            CompleteContainer.innerHTML = kartoona;
        }

        HideEmptyComplete();
        UpdatedButtons();
        DeleteButtons();
        ToDOAccess();
        StartAccess();
        SetCounters();
        ShowSpinner()

    } else { 
        if (CompleteContainer) {
            CompleteContainer.innerHTML = '';
        }
        ShowEmptyComplete();
    }
}


    function ShowEmpty() {
         EmptyFolder?.classList.remove('hidden')
         EmptyFolder?.classList.add('flex')
    }
    function HideEmpty(){
        EmptyFolder?.classList.add('hidden')
        EmptyFolder?.classList.remove('flex')
    }
    function ShowEmptyInProgress() {
         EmptyFolderInProgress?.classList.remove('hidden')
         EmptyFolderInProgress?.classList.add('flex')
    }
    function ShowEmptyComplete() {
         EmptyComplete?.classList.remove('hidden')
         EmptyComplete?.classList.add('flex')
    }
    function HideEmptyInProgress(){
        EmptyFolderInProgress?.classList.add('hidden')
        EmptyFolderInProgress?.classList.remove('flex')
    }
    function HideEmptyComplete(){
        EmptyComplete?.classList.add('hidden')
        EmptyComplete?.classList.remove('flex')
    }

    function checkForEmpty() {
        if(ToDoArry.length != 0) {
            HideEmpty()
        }else {
            ShowEmpty()
        }
    }

    
    

   function DeleteToDoTask(x: number, cat: string) {
    let ChoicArray: Task[];

    if (cat === 'ToDo') {
        ChoicArray = ToDoArry;
    } else if (cat === 'InProgress') {
        ChoicArray = InProgressArry;
    } else if(cat === 'Completed')  {
        ChoicArray = CompletedArry;
    }
    else {
        return;
    }

    Swal.fire({
        title: "Delete Task?",
        text: "Are you sure you want to delete this task?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it",
        cancelButtonText: "Cancel",
        reverseButtons: true
    }).then((result: any) => {

        if (result.isConfirmed) {
            ChoicArray.splice(x, 1);

            if (cat === 'ToDo') {
                localStorage.setItem('ToDoList', JSON.stringify(ToDoArry));
                Display(); 
            } else if (cat === 'InProgress') {
                localStorage.setItem('InProgress', JSON.stringify(InProgressArry));
                DisplayInProgress();
            } else if (cat === 'Completed') {
                localStorage.setItem('CompletedList', JSON.stringify(CompletedArry));
                DisplayComplete()
            }

            Swal.fire({
                title: "Deleted!",
                text: "Your task has been deleted.",
                icon: "success",
                timer: 1500,
                showConfirmButton: false
            });

            ShowDeleted()
        }
    });
  }

  function hideDarkLayer(){
        darkLayer?.classList.add('hidden');
        modal?.classList.add('hidden');
  }

  function showDarKLayer(){
        darkLayer?.classList.remove('hidden');
        modal?.classList.remove('hidden');
  }

  function closemodal(){
        hideDarkLayer()
        HideAlert()
        ClearData()
        SaveChanges?.classList.add('hidden');
        SaveChanges?.classList.remove('flex');
        AddTaskbtn?.classList.remove('hidden');
        AddTaskbtn?.classList.add('flex');
  }


    OpenModal?.addEventListener('click', (e) => {
        e.stopPropagation(); 
        showDarKLayer()
    }); 

    CloseBtn?.addEventListener('click',(e)=>{
        e.stopPropagation();
        closemodal()
        HideAlert()
        HideDateAlert()
    });

    CancelBtn?.addEventListener('click',(e)=>{
        e.stopPropagation();
        closemodal()
        HideAlert()
        HideDateAlert()
    })

    function ShowAlert(){
            TitleAlert?.classList.remove('hidden')
            Titleinput?.classList.add('required:border','required:border-red-600')
            Titleinput?.classList.remove('focus:ring-violet-500')
            Titleinput?.classList.add('focus:ring-red-500')
    }

    function HideAlert(){
            TitleAlert?.classList.add('hidden')
            Titleinput?.classList.remove('required:border','required:border-red-600')
            Titleinput?.classList.add('focus:ring-violet-500')
            Titleinput?.classList.remove('focus:ring-red-500')
    }
    function ShowDateAlert(){
            DateAlert?.classList.remove('hidden')
            Dateinput?.classList.add('required:border','required:border-red-600')
            Dateinput?.classList.remove('focus:ring-violet-500')
            Dateinput?.classList.add('focus:ring-red-500')
    }

    function HideDateAlert(){
            DateAlert?.classList.add('hidden')
            Dateinput?.classList.remove('required:border','required:border-red-600')
            Dateinput?.classList.add('focus:ring-violet-500')
            Dateinput?.classList.remove('focus:ring-red-500')
    }


    function IsValidDate(): boolean {


    const selectedDate = new Date(Dateinput.value);
    selectedDate.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
        ShowDateAlert();
        return false;
    }

    HideDateAlert();
    return true;
}


    AddTaskbtn?.addEventListener('click',(e)=>{
        if (Titleinput.value.trim() != '') {

            if (!IsValidDate()) {
                return;
            }

            e.stopPropagation();

            let NewTask: Task = {
                Title: Titleinput.value,
                Priority: PriortyInput.value,
                TaskDate: Dateinput.value,
                Descrption: Descriptioninput.value,
                CreatedAt: Date.now(),
                Category: 'ToDo'
            };

            ToDoArry.push(NewTask);

            localStorage.setItem(
                'ToDoList',
                JSON.stringify(ToDoArry)
            );

            hideDarkLayer();
            Display();
            HideEmpty();
            ClearData();
            HideAlert();
            ShowCreated();

        } else {
            ShowAlert();
        }
        
    })


    
    Titleinput?.addEventListener('input', () => {

    if (Titleinput.value.trim() !== '') {
        HideAlert();
    }

});

            
   function DeleteButtons() {
    const DeleteTrash = document.querySelectorAll('.DeleteElement');

    DeleteTrash.forEach((btn) => {
        btn.addEventListener('click', () => {

            const index = Number((btn as HTMLElement).dataset.index);

            const isInProgress =
                (btn as HTMLElement).closest('#InProgressContainer') !== null;

            const isCompleted =
                (btn as HTMLElement).closest('#CompleteContainer') !== null;

            let cat: string;

            if (isCompleted) {
                cat = 'Completed';
            } 
            else if (isInProgress) {
                cat = 'InProgress';
            } 
            else {
                cat = 'ToDo';
            }

            DeleteToDoTask(index, cat);
        });
    });
}
function StartAccess() {
    const startBtns = document.querySelectorAll('.StartBtn');

    startBtns.forEach((btn) => {
        btn.addEventListener('click', function (e) {
            const target = e.currentTarget as HTMLElement;
            const selectedIndex = Number(target.dataset.index);
            const SelectedCat = target.dataset.cat || target.dataset.category;

            if (SelectedCat === 'ToDo') {
                if (!isNaN(selectedIndex) && ToDoArry[selectedIndex] !== undefined) {
                    const task = ToDoArry[selectedIndex];
                    task.Category = 'InProgress';

                    InProgressArry.push(task);
                    localStorage.setItem('InProgress', JSON.stringify(InProgressArry));

                    ToDoArry.splice(selectedIndex, 1);
                    localStorage.setItem('ToDoList', JSON.stringify(ToDoArry));
                }
            } else if (SelectedCat === 'Completed') {
                if (!isNaN(selectedIndex) && CompletedArry[selectedIndex] !== undefined) {
                    const task = CompletedArry[selectedIndex];
                    task.Category = 'InProgress';

                    InProgressArry.push(task);
                    localStorage.setItem('InProgress', JSON.stringify(InProgressArry));

                    CompletedArry.splice(selectedIndex, 1);
                    localStorage.setItem('CompletedList', JSON.stringify(CompletedArry));
                }
            }

            Display();
            DisplayInProgress();
            DisplayComplete();
        });
    });
}
function ToDOAccess() {
    const TodoBtns = document.querySelectorAll('.ToDoBtn');

    TodoBtns.forEach((btn) => {
        btn.addEventListener('click', function (e) {
            const target = e.currentTarget as HTMLElement;
            const selectedIndex = Number(target.dataset.index);
            const SelectedCat = target.dataset.cat || target.dataset.category;

            if (SelectedCat === 'InProgress') {
                if (!isNaN(selectedIndex) && InProgressArry[selectedIndex] !== undefined) {
                    const task = InProgressArry[selectedIndex];
                    task.Category = 'ToDo';

                    ToDoArry.push(task);
                    localStorage.setItem('ToDoList', JSON.stringify(ToDoArry));

                    InProgressArry.splice(selectedIndex, 1);
                    localStorage.setItem('InProgress', JSON.stringify(InProgressArry));
                }
            } else if (SelectedCat === 'Completed') {
                if (!isNaN(selectedIndex) && CompletedArry[selectedIndex] !== undefined) {
                    const task = CompletedArry[selectedIndex];
                    task.Category = 'ToDo';

                    ToDoArry.push(task);
                    localStorage.setItem('ToDoList', JSON.stringify(ToDoArry));

                    CompletedArry.splice(selectedIndex, 1);
                    localStorage.setItem('CompletedList', JSON.stringify(CompletedArry));
                }
            }

            Display();
            DisplayInProgress();
            DisplayComplete();
        });
    });
}
function ToCompleteAccess() {
    const TodoBtns = document.querySelectorAll('.Complete');

    TodoBtns.forEach((btn) => {
        btn.addEventListener('click', function (e) {
            const target = e.currentTarget as HTMLElement;
            const selectedIndex = Number(target.dataset.index);
            
            const SelectedCat = target.dataset.cat || target.dataset.category;

            if (SelectedCat === 'ToDo') {
                if (!isNaN(selectedIndex) && ToDoArry[selectedIndex] !== undefined) {
                    const task = ToDoArry[selectedIndex];
                    task.Category = 'Completed';
                    
                    CompletedArry.push(task);
                    localStorage.setItem('CompletedList', JSON.stringify(CompletedArry));

                    ToDoArry.splice(selectedIndex, 1);
                    localStorage.setItem('ToDoList', JSON.stringify(ToDoArry));
                } 
            } else if (SelectedCat === 'InProgress') {
                if (!isNaN(selectedIndex) && InProgressArry[selectedIndex] !== undefined) {
                    const task = InProgressArry[selectedIndex];
                    task.Category = 'Completed';
                    
                    CompletedArry.push(task);
                    localStorage.setItem('CompletedList', JSON.stringify(CompletedArry));

                    InProgressArry.splice(selectedIndex, 1);
                    localStorage.setItem('InProgress', JSON.stringify(InProgressArry));
                } 
            }

            Display();
            DisplayInProgress();
            DisplayComplete();
        });
    });
}


let currentTaskStatus: string = '';

function UpdatedButtons() {
    const UpdatedElements = document.querySelectorAll('.Update-Elements');
    
    UpdatedElements.forEach((btn) => {
        btn.addEventListener('click', () => {
            showDarKLayer()
            
            SaveChanges?.classList.remove('hidden');
            SaveChanges?.classList.add('flex');
            AddTaskbtn?.classList.add('hidden');
            AddTaskbtn?.classList.remove('flex');
            
            let updatedElmnt = Number((btn as HTMLElement).dataset.index);
            let taskStatus = (btn as HTMLElement).dataset.cat || 'ToDo'; 

            UniqeIndex = updatedElmnt;
            currentTaskStatus = taskStatus;

            let targetArray = ToDoArry;
            if (taskStatus === 'InProgress') targetArray = InProgressArry;
            else if (taskStatus === 'Completed') targetArray = CompletedArry;

            if (targetArray[updatedElmnt]) {
                Titleinput.value = targetArray[updatedElmnt].Title;
                PriortyInput.value = targetArray[updatedElmnt].Priority;
                Dateinput.value = targetArray[updatedElmnt].TaskDate;
                Descriptioninput.value = targetArray[updatedElmnt].Descrption;
            }
        });
    });
}

SaveChanges?.addEventListener('click', (e) => {
    e.stopPropagation();

    if (Titleinput.value.trim() === '') {
        ShowAlert();
        return;
    }

    if (!IsValidDate()) {
        return;
    }

    
    HideAlert();

    let targetArray = ToDoArry;
    let storageKey = 'ToDoList';

    if (currentTaskStatus === 'InProgress') {
        targetArray = InProgressArry;
        storageKey = 'InProgress';
    } else if (currentTaskStatus === 'Completed') {
        targetArray = CompletedArry;
        storageKey = 'CompletedList';
    }

    if (UniqeIndex !== -1 && targetArray[UniqeIndex]) {

        Swal.fire({
            title: "Save Changes?",
            text: "Are you sure you want to save these changes?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, save changes",
            cancelButtonText: "Cancel",
            reverseButtons: true
        }).then((result: any) => {

            if (result.isConfirmed) {
                targetArray[UniqeIndex].Title = Titleinput.value;
                targetArray[UniqeIndex].Priority = PriortyInput.value;
                targetArray[UniqeIndex].TaskDate = Dateinput.value;
                targetArray[UniqeIndex].Descrption = Descriptioninput.value;

                localStorage.setItem(
                    storageKey,
                    JSON.stringify(targetArray)
                );

                Display();
                DisplayComplete();
                DisplayInProgress();
                darkLayer?.classList.add('hidden');
                modal?.classList.add('hidden');

                ClearData();

                SaveChanges?.classList.add('hidden');
                SaveChanges?.classList.remove('flex');

                AddTaskbtn?.classList.remove('hidden');
                AddTaskbtn?.classList.add('flex');

                UniqeIndex = -1;
                currentTaskStatus = '';

                Swal.fire({
                    title: "Saved!",
                    text: "Your task has been updated successfully.",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false
                });

                ShowUpdated(); 
            }
        });
    }
});


    Display()
    DisplayComplete()
    DisplayInProgress()
    DeleteButtons()
    UpdatedButtons()
    ShowSpinner()
    

})();



