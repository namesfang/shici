<script lang="ts">
	import Icon from "./Icon.svelte";

	import { pushState, replaceState } from "$app/navigation";

  import { createEventDispatcher } from "svelte";
  

  type Callback = (close: ()=> void)=> void
  type Action = Callback | 'login' | 'signup' | null

  type Options = {
    text: string;
    enabled: boolean;
    action: Action;
    redirect: false;
  }

  export let visible = false;

  export let title = '操作提示'

  export let content: string = '';
  export let contentCssText: string = '';

  export let confirmOptions = {} as Options

  export let cancelOptions = {} as Options

  export let confirmText = '确定';
  export let confirmEnabled = true;
  export let confirmAction: Action = null;
  export let confirmRedirect = false;

  export let cancalText = '取消';
  export let cancelEanbled = true;
  export let cancelAction: Action = null;
  export let cancelRedirect = false;

  const close = ()=> {
    visible = false
  }

  const actions = {
    login: '/login',
    signup: '/signup'
  }

  const mergeConfirmOptions: Options = {
    text: confirmOptions.text ?? confirmText,
    action: confirmOptions.action ?? confirmAction,
    enabled: confirmOptions.enabled ?? confirmEnabled,
    redirect: confirmOptions.redirect ?? confirmRedirect,
  }

  const mergeCancelOptions: Options = {
    text: cancelOptions.text ?? cancalText,
    action: cancelOptions.action ?? cancelAction,
    enabled: cancelOptions.enabled ?? cancelEanbled,
    redirect: cancelOptions.redirect ?? cancelRedirect,
  }

  const dispatch = createEventDispatcher()

  const confirmHandle = ()=> {
    if(typeof mergeConfirmOptions.action === 'string') {
      const url = actions[mergeConfirmOptions.action]
      if(Object.keys(actions).includes(mergeConfirmOptions.action)) {
        mergeConfirmOptions.redirect ? replaceState(url, {}) : pushState(url, {})
      }
    } else if (typeof mergeConfirmOptions.action === 'function') {
      mergeConfirmOptions.action(()=> {
        visible = false
      })
    } else {
      visible = false
    }
  }

  const cancelHandle = ()=> {
    if(typeof mergeCancelOptions.action === 'string') {
      const url = actions[mergeCancelOptions.action]
      if(Object.keys(actions).includes(mergeCancelOptions.action)) {
        mergeCancelOptions.redirect ? replaceState(url, {}) : pushState(url, {})
      }
    } else if (typeof mergeCancelOptions.action === 'function') {
      mergeCancelOptions.action(()=> {
        visible = false
      })
    } else {
      visible = false
    }
  }
</script>
{#if visible}
  <div class="dialog-lock">
    <div class="dialog">
      <header>
        <h2>{title}</h2>
        <button on:click={ close } type="button">
          <Icon type="close" color="--primary-900"/>
        </button>
      </header>
      <main style={contentCssText}>
        <slot>
          <p class="optional-fallback">{content}</p>
        </slot>
      </main>
      {#if mergeConfirmOptions.enabled || mergeCancelOptions.enabled}
        <footer>
          <ul>
            {#if mergeConfirmOptions.enabled}
              <li>
                <button on:click={confirmHandle} type="button" class="confirm">{mergeConfirmOptions.text}</button>
              </li>
            {/if}
            {#if mergeCancelOptions.enabled}
              <li>
                <button on:click={cancelHandle} type="button" class="cancel">{mergeCancelOptions.text}</button>
              </li>
            {/if}
          </ul>
        </footer>
      {/if}
    </div>
  </div>
{/if}

<style lang="scss" scoped>
.dialog-lock {
  position: fixed;
  inset: 0;
  background-color: rgba(0,0,0,.5);
  display: flex;
  align-items: center;
  justify-content: center;
  
  .dialog {
    max-width: 80%;
    min-width: 300px;
    min-height: 80px;
    background-color: var(--white);
    display: flex;
    flex-direction: column;

    header {
      height: 46px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      h2 {
        color: var(--gray-600);
        padding: 0 24px;
        font: {
          size: 18px;
          weight: normal;
        }
      }
      button {
        width: 46px;
        height: 46px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 0;
        background-color: transparent;
        cursor: pointer;
        &:active {
          background-color: var(--gray-100);
          
        }
      }
    }

    main {
      flex: 1;
      padding: 24px;
      .optional-fallback {
        line-height: 24px;
        font-size: 14px;
        text-align: center;
        margin: 0;
      }
    }

    footer {
      height: 46px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px 24px;
      ul {
        display: flex;
        li {
          flex: 1;

          &+li {
            margin-left: 20px;
          }

          button {
            min-width: 140px;
            height: 46px;
            border: 0;
            font-size: 14px;
            line-height: 36px;
            text-align: center;
            position: relative;
            &:active {
              &::after {
                content: "";
                background-color: rgba(0,0,0,.2);
                position: absolute;
                inset: 0;
              }
            }
          }
          .confirm {
            color: var(--white);
            background-color: var(--primary-900);
          }
          .cancel {
            color: var(--gray-600);
            background-color: transparent;
          }
        }
      }
    }
  }
}
</style>