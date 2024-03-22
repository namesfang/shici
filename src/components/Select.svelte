<script lang="ts">
	import { onMount } from "svelte";

  type Trigger = 'hover' | 'click'

  type Option = {
    label: string;
    value: string | number;
  }

  export let large = false;
  export let medium = true;
  export let small = false;

  export let options: Array<Option>;

  export let placeholder = '请选择';

  export let visible = false;

  export let value: string | number = '';

  // export let trigger: Trigger = 'hover';
  let label: string;

  let buttonElement: HTMLButtonElement;
  const toggle = ({ target }: MouseEvent)=> {
    visible = !visible
    buttonElement = target as HTMLButtonElement
  }

  const handle = (option: Option)=> {
    visible = false
    label = option.label
    value = option.value
  }


  $: label = options.find((t)=> t.value == value)?.label ?? ''

  $: height = large ? '46px' : (medium ? '32px' : (small ? '24px' : '24px'))

  onMount(()=> {
    document.body.addEventListener('click', ({ target }: MouseEvent)=> {
      if(buttonElement !== target) {
          visible = false
      }
    })
  })
</script>

<div style={`--height: ${height}`} class={`select-wrapper ${visible ? 'select-wrapper__open' : ''}`}>
  <button on:click={toggle} type="button" class={ `trigger ${ !label ? 'placeholder' : ''}`}>{ label ?? placeholder }</button>
	<ul>
		{#each options as option}
			<li>
        <button on:click={ ()=> handle(option) } type="button">{ option.label }</button>
      </li>
		{/each}
	</ul>
</div>

<style lang="scss">
  .select-wrapper__open {
    

    .trigger {
      &::after {
        transition: all .3s;
        transform-origin: 6px 3px;
        transform: rotate(180deg);
      }
    }

    ul {
      transition: all .2s;
      display: block !important;
    }
  }

	.select-wrapper {
		height: var(--height);
		position: relative;

    .placeholder {
      color: var(--gray-400);
    }

    .trigger {
      width: 100%;
      height: var(--height);
      text-align: left;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      background-color: transparent;
      padding: 0 calc(var(--height) / 4);
      border: 1px solid var(--gray-300);
      border-radius: 4px;
		  cursor: pointer;

      position: relative;

      &::after {
        content: '';
        width: 0;
        height: 0;
        border: 6px solid transparent;
        border-top-color: var(--gray-300);
        position: absolute;
        right: 10px;
        top: 50%;
        margin-top: -3px;
      }

      &:hover {
        border-color: var(--gray-400);
        overflow: inherit;
      }
    }

		ul {
      display: none;
			border-radius: 4px;
			background-color: var(--white);
			font-size: 14px;
			border-radius: 4px;
			border: 1px solid var(--gray-300);

			position: absolute;
      inset: var(--height) 0 auto 0;

			&:hover {
				border-color: var(--gray-400);
			}

			&:focus {
				border-color: transparent;
				outline: 3px solid var(--primary-400);
			}

			li {
        button {
          width: 100%;
          border: 0;
          height: 38px;
          line-height: 38px;
          padding: 0 12px;
          background-color: transparent;
          cursor: pointer;
          &:hover {
            color: var(--white);
            background-color: var(--primary-900);
          }
        }
			}
		}
	}
</style>
