<template> 
    <div class="memo">
        <div class="act">
            <button class="btn btn-primary" @click="add()">+ 추가</button>
        </div>
        <ul>
            <li v-for="(d, idx) in state.data" :key="idx">
                {{ d.content }}
                <div class="btn-box">
                    <button class="btn btn-warning btn-sm" @click="edit(d.id)">수정</button>
                    <button class="btn btn-secondary btn-sm" @click="remove(d.id)">삭제</button>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { reactive } from "vue"
import axios from "axios"

export default {
    name: "Memo",
    setup() {
        const state = reactive({
            data: []
        })

        // 메모 리스트 조회
        axios.get("/api/memos").then((res) => {
            state.data = res.data
        })

        // 메모 추가
        const add = () => {
            const content = prompt("내용을 입력해주세요");

            if(!content) {
                alert("내용을 입력해주세요")
                return add();
            }

            axios.post("/api/memos", { content }).then((res) => {
                state.data = res.data;
            })
        }
        
        // 메모 수정
        const edit = (idx) => {
            axios.get("/api/memos/" + idx).then((res) => {            
                const content = prompt("수정할 내용을 입력해주세요", res.data[0].content)

                if(content !== null) {
                    axios.put("/api/memos/" + idx, { content }).then((res) => {
                    state.data = res.data;
                })
                }
            })
        };

        // 메모 삭제
        const remove = (idx) => {
            const userConfirmed = window.confirm("정말 삭제하시겠습니까?");

            if(userConfirmed) {
                console.log("삭제됨", idx);
                axios.delete("/api/memos/" + idx).then((res) => {
                    state.data = res.data;
                })
            }else {
                console.log("삭제 취소됨");
            }
        }
        
        return { state, add, edit, remove };
    }
}
</script>

<style scoped>
.memo ul {
    list-style: none;
    padding: 0;
    margin: 0;
    border-top: 1px solid #eee;
}

.memo ul li {
    padding: 15px;
    margin: 10px;
    border: 1px solid #eee;
    display: flex;
    justify-content: space-between;
}

.btn-box .btn {
    margin-left: 5px;
}

.memo .act {
    text-align: right;
    padding: 10px 5px 5px 5px;
}
</style>